import { Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from "@angular/core";

import { AnimationCurve } from "@nativescript/core/ui/enums";
import { RouterExtensions } from "@nativescript/angular";
import { LayoutBase, ScrollEventData, ScrollView, Image, Label, ViewBase, GridLayout, GridUnitType, TextField } from "tns-core-modules";
import { screen } from "tns-core-modules/platform/platform"
import { ActivatedRoute } from "@angular/router";
import { ItemSpec } from "tns-core-modules/ui/layouts/grid-layout";
import { alert } from "tns-core-modules/ui/dialogs";


import { CustomTransitionBack } from "../../../util/klook-transition";
import { DataService } from "../../../service/data.service";
import { CountryService } from "../../../service/country.service";
import { TransactionService } from "../../../service/transaction.service";
import { OctopusService } from "../../../service/octopus.service";
import { ProgressService } from "../../../components/progress/progress.service";

@Component({
    selector: "octopus-charge",
    templateUrl: "./octopus-charge.component.html",
    styleUrls: ["./octopus-charge.component.scss"]
})
export class OctopusChargeComponent implements OnInit {
    tag = this.constructor.name;

    @ViewChild('cardframe', { static: true }) cardframe: ElementRef;
    @ViewChild('cardelems', { static: true }) cardelems: ElementRef;

    card_index = 0;
    selected_country = "";
    amount: string;
    amount_num: number = 0;
    exchanged:number = 0;

    constructor(private routerExtensions: RouterExtensions,
        private activatedRoute: ActivatedRoute,
        private dataService: DataService,
        private octopusService: OctopusService,
        private countryService: CountryService,
        private transactionService: TransactionService,
        private viewContainerRef : ViewContainerRef,
        private progressService : ProgressService,) {
        console.log(`${this.tag} constructor `)
    }

    ngOnInit(): void {
        console.log(`${this.tag} ngOnInit`);
        console.log(this.routerExtensions.router.url);
        console.log(this.activatedRoute.params.subscribe(params => {
            let countries = ["싱가포르", "홍콩", "영국"]
            this.card_index = params['index'];
            this.selected_country = countries[this.card_index];
            console.log("index = ", this.card_index, this.selected_country);
        }));


    }

    // actionbar emit click close
    actionbar_click_close(isclose) {
        console.log(this.tag + " actionbar close button clicked = " + isclose);
        this.routerExtensions.navigate(['/main/home'], { clearHistory: true, transition: { instance: new CustomTransitionBack(250, AnimationCurve.linear) } });
    }
    onLayoutChangedCardImage(event) {
        let p = screen.mainScreen.heightDIPs / screen.mainScreen.heightPixels;
        setTimeout(() => {
            let img = this.cardframe.nativeElement as Image;
            let lb = this.cardelems.nativeElement as GridLayout;

            let img_height = img.getMeasuredHeight() * p;
            let top_height = lb.getRows()[0].value;
            let bottom_height = lb.getRows()[2].value;
            let shadow_margin = 46;


            console.log(img.getMeasuredHeight() * p);
            console.log(lb);
            let parent = img.parentNode;
            lb.removeRows();
            lb.addRow(new ItemSpec(top_height, GridUnitType.PIXEL));
            lb.addRow(new ItemSpec((img_height - (top_height + bottom_height) - shadow_margin), GridUnitType.PIXEL));
            lb.addRow(new ItemSpec(bottom_height , GridUnitType.PIXEL));
        });
    }

    onChangeTextField() {
        console.log("amount = ", this.amount);
        let string = String(this.amount);
    }

    onReturnPress(event) {
        let tf = event.object as TextField;
        this.amount_num = Number(tf.text.replace(/[^0-9.]/g, ""));
        console.log(tf.text);
        console.log(tf.text.replace(/[^0-9.]/g, ""));
        console.log(this.amount_num);
        this.exchanged = this.amount_num / this.octopusService.octopus[this.selected_country].exchange;
        // this.amount_num = this.exchanged * this.octopusService.octopus[this.selected_country].exchange;

        // if (this.dataService.point < exchanged) {
        //     this.amount_num = Math.floor(this.dataService.point / this.octopusService.octopus[this.selected_country].exchange);
        //     console.log(this.amount_num);
        //     this.amount = this.amount_num.toLocaleString('en-GB');
        //     tf.text = this.amount_num.toLocaleString('en-GB');
        //     console.log(this.amount);
        // }
    }
    onTabCharge(event) {
        console.log("emit the button");
        if (this.exchanged <= 0) {
            alert({
                title: "옥토퍼스 카드충전",
                message: "충전 금액을 확인해주세요",
                okButtonText: "확인"
            });
        } 
        else if(this.dataService.point < this.amount_num){
            alert({
                title: "옥토퍼스 카드충전",
                message: "보유 포인트가 부족합니다",
                okButtonText: "확인"
            });
        }
        else {
            this.progressService.progressOn(this.viewContainerRef);
            this.transactionService.addTr({
                type: "transactions",
                class: "교통카드충전",
                merchant: this.octopusService.octopus[this.selected_country].title + " 충전",
                point: -this.amount_num,
                curr: 0,
                country: "",
                date: new Date(),
                description: this.octopusService.octopus[this.selected_country].title + " 충전",
                taxfree: false,
                utu: false,
                save_point: 0,
            }).subscribe(
                res => {
                    this.progressService.progressOff();
                    alert({
                        title: "교통카드 충전",
                        message: "교통카드 충전에 성공하였습니다",
                        okButtonText: "확인"
                    }).then(() => {
                        this.octopusService.addOctopusBalance(this.selected_country, this.exchanged);
                        this.routerExtensions.navigate(['/main/octopus/main'], {
                            clearHistory: true,
                            transition: { instance: new CustomTransitionBack(250, AnimationCurve.linear) }
                        });
                    });
                },
                err => { 
                    console.log("error =", err)
                    this.progressService.progressOff();
                    alert({
                        title: "교통카드 충전",
                        message: "교통카드 충전에 실패했습니다",
                        okButtonText: "확인"
                    })
                },
                ()=>{ this.progressService.progressOff(); }
            );
        }
    }
}
