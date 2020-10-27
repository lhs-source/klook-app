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
    use_point = 150000;
    stack_point = 4120;

    // sort tab
    //  - 0 : all
    //  - 1 : amount
    //  - 2 : charge / change
    //  - 3 : save point
    sort_type = 0;

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

        if (this.transactionService.trs.length > 0) {
            let sumpoint = 0;
            let sumsave = 0;
            this.transactionService.trs.forEach((elem) => {
                if (elem.point < 0) {
                    sumpoint = sumpoint + elem.point;
                }
                sumsave = sumsave + elem.save_point;
            });
            this.use_point = Math.abs(sumpoint);
            this.stack_point = sumsave;
        }

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
    }
    onTapPrevMonth(event, direction) {
        this.today.setMonth(this.today.getMonth() - 1);

        console.log(this.today.getMonth());
        this.transactionService.setMonth(this.today.getMonth());
    }

    onTapNextMonth(event, direction) {
        this.today.setMonth(this.today.getMonth() + 1);

        console.log(this.today.getMonth());
        this.transactionService.setMonth(this.today.getMonth());
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

        this.progressService.progressOn(this.viewcontainerRef);
        setTimeout(() => {
            this.progressService.progressOff();
        }, 250);
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
