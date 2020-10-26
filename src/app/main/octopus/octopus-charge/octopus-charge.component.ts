import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";

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

@Component({
    selector: "octopus-charge",
    templateUrl: "./octopus-charge.component.html",
    styleUrls:["./octopus-charge.component.scss"]
})
export class OctopusChargeComponent implements OnInit {
    tag = this.constructor.name;

    @ViewChild('cardframe', {static:true}) cardframe : ElementRef;
    @ViewChild('cardelems', {static:true}) cardelems : ElementRef;

    card_index = 0;
    amount : string;
    amount_num : number = 0;

    constructor(private routerExtensions : RouterExtensions, 
        private activatedRoute : ActivatedRoute,
        private dataService: DataService,
        private countryService: CountryService,
        private transactionService : TransactionService) {
        console.log(`${this.tag} constructor `)
    }

    ngOnInit(): void {
        console.log(`${this.tag} ngOnInit`);
        console.log(this.routerExtensions.router.url);
        console.log(this.activatedRoute.params.subscribe(params=> {
            this.card_index = params['index'];
            console.log("index = " + this.card_index);
        }));
        
        
    }

    // actionbar emit click close
    actionbar_click_close(isclose){
        console.log(this.tag + " actionbar close button clicked = " + isclose);
        this.routerExtensions.navigate(['/main/home'], { clearHistory:true, transition: { instance : new CustomTransitionBack(250, AnimationCurve.linear) } });
    }
    onLoadedCardImage(event){
        let p = screen.mainScreen.heightDIPs / screen.mainScreen.heightPixels;
        setTimeout(() => {
            let img = this.cardframe.nativeElement as Image;
            let lb = this.cardelems.nativeElement as GridLayout;

            let img_height = img.getMeasuredHeight() * p;
            let top_bottom_height = 60;
            let shadow_margin = 46;


            console.log(img.getMeasuredHeight() * p);
            console.log(lb);
            let parent = img.parentNode;
            lb.removeRows();
            lb.addRow(new ItemSpec(top_bottom_height, GridUnitType.PIXEL));
            lb.addRow(new ItemSpec((img_height - top_bottom_height * 2 - shadow_margin), GridUnitType.PIXEL));
            lb.addRow(new ItemSpec(top_bottom_height, GridUnitType.PIXEL));            
        });
    }

    onReturnPress(event){
        let tf = event.object as TextField;
        this.amount_num = Number(tf.text);
        let exchanged = this.amount_num * this.countryService.exchange_hk;
        if(this.dataService.point < exchanged){
            this.amount_num = this.dataService.point / this.countryService.exchange_hk;
        }
    }
    onTabCharge(event){
        console.log("emit the button");
        alert({
            title: "옥토퍼스 카드충전",
            message: "옥토퍼스 카드충전에 성공하였습니다.",
            okButtonText: "확인"
        }).then(()=>{
            this.dataService.addOctopusBalance(this.amount_num);
            this.transactionService.addTr({
                type:"transactions",
                class: "포인트충전",
                merchant: "옥스퍼드 카드충전",
                point: this.amount_num * this.countryService.exchange_hk,
                curr: this.amount_num,
                date: new Date(),
                description: "옥스퍼드 카드충전",
                taxfree: false,
                utu: false,
                save_point: 0,
            });
            
            this.routerExtensions.navigate(['/main/octopus/main'], { 
                clearHistory:true,
                transition: { instance : new CustomTransitionBack(250, AnimationCurve.linear) }
            });
        });
    }
}
