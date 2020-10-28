import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { AnimationCurve } from "@nativescript/core/ui/enums";
import { RouterExtensions } from "@nativescript/angular";
import { ActivatedRoute } from "@angular/router";
import { CustomTransitionBack } from "../../../util/klook-transition";
import { DataService } from "../../../service/data.service";

import { alert } from "tns-core-modules/ui/dialogs";
import { TransactionService } from "../../../service/transaction.service";
import { TextField } from "tns-core-modules";

@Component({
    selector: "normal-change",
    templateUrl: "./normal-change.component.html",
    styleUrls: ["./normal-change.component.scss"]
})
export class NormalChangeComponent implements OnInit {
    tag = this.constructor.name;

    @ViewChild('textfield', { static: true }) textfield: ElementRef;
    amount = '';
    amount_num = 0;

    constructor(private routerExtensions: RouterExtensions,
        private activatedRoute: ActivatedRoute,
        private dataService: DataService,
        private transactionService: TransactionService) {
        console.log(`${this.tag} constructor `);

    }
    ngOnInit(): void {
        console.log(`${this.tag} ngOnInit`);
        console.log(this.routerExtensions.router.url);
    }

    // textfield input done
    onReturnPress(event) {
        let tf = event.object as TextField;
        this.amount_num = Number(tf.text.replace(/[^0-9.]/g, ""));
        if (this.amount_num > this.dataService.selected_way.balance) {
            this.amount_num = this.dataService.selected_way.balance;
            this.amount = this.amount_num.toLocaleString('en-GB');
            tf.text = this.amount_num.toLocaleString('en-GB');
            tf.android.setSelection(tf.text.length);
        }
    }

    // go charge
    onTapCharge() {
        if (this.amount_num <= 0) {
            alert({
                title: "포인트충전",
                message: "충전 금액을 확인해주세요",
                okButtonText: "확인"
            });
        } else {
            this.transactionService.addTr({
                type: "transactions",
                class: "포인트충전",
                merchant: this.dataService.selected_way.title + " 충전",
                point: this.amount_num,
                curr: 0,
                country: "",
                date: new Date(),
                description: "포인트충전",
                taxfree: false,
                utu: false,
                save_point: 0,
            });
            alert({
                title: "포인트충전",
                message: "포인트충전에 성공했습니다",
                okButtonText: "확인"
            }).then(() => {
                // update point    
                this.dataService.addPoint(this.amount_num);
                this.dataService.decreaseWay(this.amount_num);

                this.routerExtensions.navigate(['/main/home'], {
                    transition: { instance: new CustomTransitionBack(250, AnimationCurve.linear) },
                    clearHistory: true
                });
            });
        }
    }
}
