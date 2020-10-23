import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { AnimationCurve } from "@nativescript/core/ui/enums";
import { Application, AndroidApplication, AndroidActivityBackPressedEventData, isAndroid, EventData, LayoutBase, View, Color, Label } from "tns-core-modules";
import { screen } from "tns-core-modules/platform";

import { CustomTransition, CustomTransitionBack } from "../../../util/klook-transition";
import { animate, JsAnimationDefinition } from "../../../util/animation-helpers";
import { KeyValue } from "@angular/common";
import { DataService } from "../../../service/data.service";

@Component({
    selector: "tr-history",
    templateUrl: "./tr-history.component.html",
    styleUrls: ["./tr-history.component.scss"]
})
export class TrHistoryComponent implements OnInit {
    tag = this.constructor.name;

    today = Date.now();
    use_point = 150000;
    stack_point = 4120;

    // trs
    trs ={};
    icons = {
        "백화점": "~/images/ico_type2.png",
        "편의점": "~/images/ico_type3.png",
        "식당": "~/images/ico_type5.png",
        "포인트충전": "~/images/ico_type1.png",
        "마트": "~/images/ico_type4.png",
        "스포츠": "~/images/ico_type6.png",
        "카페": "~/images/ico_type7.png",
        "포인트교환": "~/images/ico_type8.png",
    };
    currency = "THB"

    constructor(private routerExtensions: RouterExtensions, private dataService: DataService) {
        console.log(`${this.tag} constructor `)
        console.log("today ", this.today.toLocaleString());


        if(this.dataService.trs.length > 0){
            let sumpoint = 0;
            let sumsave = 0;
            this.dataService.trs.forEach((elem)=>{
                if(elem.point < 0){
                    sumpoint = sumpoint + elem.point;
                }
                sumsave = sumsave + elem.save_point;
            });
            this.use_point = Math.abs(sumpoint);
            this.stack_point = sumsave;
        }
        

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

        this.trs = this.dataService.getTrsGrouped();
    }

    keyDescOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
        return a.key > b.key ? -1 : (b.key > a.key ? 1 : 0);
    }
    hiAmountOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
        return a.key > b.key ? -1 : (b.key > a.key ? 1 : 0);
    }

    callback_tapElem(number){
        console.log(this.tag, "callback_tapElem = ", number);
    }

    onTapTr(tr) {
        console.log(this.tag, " onTapTr tr = ", tr);
        console.log("date = ", tr.date);
        this.routerExtensions.navigate(['/main/tr/detail', (tr.date as Date).getTime()], { transition: { instance: new CustomTransition(250, AnimationCurve.linear) }, });
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
            transition: { instance : new CustomTransitionBack(250, AnimationCurve.linear) }
        });
        // this.routerExtensions.back();
    }
}
