import { Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { AnimationCurve } from "@nativescript/core/ui/enums";
import { Application, AndroidApplication, AndroidActivityBackPressedEventData, isAndroid, EventData, LayoutBase, View, Color, Label } from "tns-core-modules";
import { screen } from "tns-core-modules/platform";

import { CustomTransition, CustomTransitionBack } from "../../../util/klook-transition";
import { animate, JsAnimationDefinition } from "../../../util/animation-helpers";
import { KeyValue } from "@angular/common";
import { DataService } from "../../../service/data.service";
import { TransactionService } from "../../../service/transaction.service";
import { CountryService } from "../../../service/country.service";
import { PaymentData } from "../../../service/payment-data.model";
import { ProgressService } from "../../../components/progress/progress.service";

@Component({
    selector: "tr-history",
    templateUrl: "./tr-history.component.html",
    styleUrls: ["./tr-history.component.scss"]
})
export class TrHistoryComponent implements OnInit {
    tag = this.constructor.name;

    today = new Date();
    use_point = 0;
    stack_point = 0;

    // sort tab
    //  - 0 : all
    //  - 1 : amount
    //  - 2 : charge / change
    //  - 3 : save point
    sort_type = 0;
    transactions : any;

    exchange = 0;

    constructor(private routerExtensions: RouterExtensions,
        private viewcontainerRef: ViewContainerRef,
        private transactionService: TransactionService,
        private countryService: CountryService,
        private dataService: DataService,
        private progressService: ProgressService) {
        console.log(`${this.tag} constructor `)
        console.log("today ", this.today.toLocaleString());

        
        this.transactionService.setMonth(this.today.getMonth());
        this.getTransactions();
        // this.transactions = this.transactionService.tr_grouped_month;
        // if (this.transactionService.trs.length > 0) {
        //     let sumpoint = 0;
        //     let sumsave = 0;
        //     this.transactionService.trs.forEach((elem) => {
        //         if (elem.point < 0) {
        //             sumpoint = sumpoint + elem.point;
        //         }
        //         sumsave = sumsave + elem.save_point;
        //     });
        //     this.use_point = Math.abs(sumpoint);
        //     this.stack_point = sumsave;
        // }

        this.exchange = Math.floor(this.dataService.point / this.countryService.exchange);

        if (isAndroid) {
            Application.android.off(AndroidApplication.activityBackPressedEvent);
            Application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
                console.log("back button pressed on " + this.tag);
                if (this.routerExtensions.router.isActive('/main/tr/history', false) === true) {
                    data.cancel = true;
                    this.routerExtensions.navigate(['/main/home'], { transition: { instance: new CustomTransitionBack(250, AnimationCurve.linear) }, clearHistory: true });
                } else {
                    data.cancel = false;
                }
            });
        }
    }

    ngOnInit(): void {
        console.log(`${this.tag} ngOnInit`);
        console.log(this.routerExtensions.router.url);
        
        setTimeout(() => {
            this.progressService.progressOn(this.viewcontainerRef);
            setTimeout(() => {
                this.progressService.progressOff();
            }, 500);
        }, 500);
    }

    getTransactions(){
        if(this.sort_type === 0){   // recent
            this.transactions = this.transactionService.tr_grouped_month;
        }else if(this.sort_type === 1){ // high amount
            this.transactions = this.transactionService.tr_order_amount;
        }else if(this.sort_type === 2){ // charge / change
            this.transactions = this.transactionService.tr_only_cc;
        }else if(this.sort_type === 3){ // save point
            this.transactions = this.transactionService.tr_only_save_point;
        }


        if(this.sort_type === 1){
            let sumpoint = 0;
            let sumsave = 0;
            this.transactions.forEach((elem) => {
                if (elem.point < 0) {
                    sumpoint = sumpoint + elem.point;
                }
                sumsave = sumsave + elem.save_point;
            });
            this.use_point = Math.abs(sumpoint);
            this.stack_point = sumsave;
        }else{
            let sumpoint = 0;
            let sumsave = 0;
            for(let key in this.transactions){
                this.transactions[key].forEach((elem) => {
                    if (elem.point < 0) {
                        sumpoint = sumpoint + elem.point;
                    }
                    sumsave = sumsave + elem.save_point;
                });
            }
            this.use_point = Math.abs(sumpoint);
            this.stack_point = sumsave;
        }
    }

    onTapPrevMonth(event, direction) {
        this.today = new Date(this.today.setMonth(this.today.getMonth() - 1));

        console.log(this.today.getMonth());
        this.transactionService.setMonth(this.today.getMonth());
        this.getTransactions();
    }

    onTapNextMonth(event, direction) {
        this.today = new Date(this.today.setMonth(this.today.getMonth() + 1));

        console.log(this.today.getMonth());
        this.transactionService.setMonth(this.today.getMonth());
        this.getTransactions();
    }

    keyDescOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
        return a.key > b.key ? -1 : (b.key > a.key ? 1 : 0);
    }
    hiAmountOrder = (a: PaymentData, b: PaymentData): number => {
        return a.point > b.point ? -1 : (b.point > a.point ? 1 : 0);
    }

    // tap sort tab
    callback_tapElem(number) {
        console.log(this.tag, "callback_tapElem = ", number);
        this.sort_type = number;
        this.getTransactions();

        // this.progressService.progressOn(this.viewcontainerRef);
        // setTimeout(() => {
        //     this.progressService.progressOff();
        // }, 500);
    }

    onTapTr(tr) {
        console.log(this.tag, " onTapTr tr = ", tr);
        console.log("date = ", tr.date);
        this.routerExtensions.navigate(['/main/tr/detail', (tr.date as Date).getTime()], {
            transition: { instance: new CustomTransition(250, AnimationCurve.linear) },
        });
    }

    // actionbar emit click close
    actionbar_click_close(isclose) {
        console.log(this.tag + " actionbar close button clicked = " + isclose);

        this.routerExtensions.navigate(['/main/home'], {
            clearHistory: true,
            transition: { instance: new CustomTransitionBack(250, AnimationCurve.linear) }
        });
    }
    onTapFirst() {
        this.routerExtensions.navigate(['/main/home'], {
            clearHistory: true,
            transition: { instance: new CustomTransitionBack(250, AnimationCurve.linear) }
        });
        // this.routerExtensions.back();
    }
}
