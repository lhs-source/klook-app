import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { AnimationCurve } from "@nativescript/core/ui/enums";
import { Application, AndroidApplication, AndroidActivityBackPressedEventData, isAndroid, EventData, LayoutBase, View, Color, Label } from "tns-core-modules";
import { screen } from "tns-core-modules/platform";

import { CustomTransition, CustomTransitionBack } from "../../home/klook-transition";
import { animate, JsAnimationDefinition } from "../../../components/tab/animation-helpers";
import { KeyValue } from "@angular/common";

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
    trs = {
        "10월 30일 금요일": [
            {
                icon: "백화점",
                merchant: "Central Department Store (Central Hat Yai)",
                point: 25000,
                curr: 676,
                date: new Date(2020, 10, 30, 14, 23, 0, 0),
                description: "포인트사용",
                taxfree: true,
                utu: false,
                save_point: 1250,
            }, {
                icon: "편의점",
                merchant: "Family mart",
                point: 4500,
                curr: 122,
                date: new Date(2020, 10, 30, 11, 30, 0, 0),
                description: "포인트사용",
                taxfree: false,
                utu: true,
                save_point: 45,
            }
        ],
        "10월 27일 화요일": [
            {
                icon: "포인트충전",
                merchant: "KB국민카드 Nori카드 충전",
                point: 100000,
                curr: 0,
                date: new Date(2020, 10, 27, 21, 10, 0, 0),
                description: "포인트 일반충전",
                taxfree: false,
                utu: false,
                save_point: 0,
            }
        ],
        "10월 25일 일요일": [
            {
                icon: "마트",
                merchant: "Big C (Thap Thiang)",
                point: 5500,
                curr: 145,
                date: new Date(2020, 10, 25, 13, 10, 0, 0),
                description: "포인트사용",
                taxfree: false,
                utu: true,
                save_point: 55,
            }, {
                icon: "식당",
                merchant: "MK Restaurants",
                point: 13500,
                curr: 365,
                date: new Date(2020, 10, 25, 12, 35, 0, 0),
                description: "포인트사용",
                taxfree: false,
                utu: true,
                save_point: 135,
            }, {
                icon: "포인트충전",
                merchant: "KB국민카드 포인트 자동충전",
                point: 50000,
                curr: 0,
                date: new Date(2020, 10, 25, 9, 45, 0, 0),
                description: "포인트 자동충전",
                taxfree: false,
                utu: false,
                save_point: 0,
            }
        ],
        "10월 24일 토요일": [
            {
                icon: "식당",
                merchant: "EATHAI",
                point: 37000,
                curr: 1001,
                date: new Date(2020, 10, 25, 18, 20, 0, 0),
                description: "포인트사용",
                taxfree: false,
                utu: true,
                save_point: 370,
            }, {
                icon: "백화점",
                merchant: "Robinson",
                point: 38000,
                curr: 1028,
                date: new Date(2020, 10, 24, 17, 24, 0, 0),
                description: "포인트사용",
                taxfree: true,
                utu: false,
                save_point: 1900,
            }, {
                icon: "마트",
                merchant: "Tops daily mini supermarket",
                point: 19000,
                curr: 324,
                date: new Date(2020, 10, 24, 13, 15, 0, 0),
                description: "포인트사용",
                taxfree: false,
                utu: true,
                save_point: 600,
            }
        ],
        "10월 23일 금요일": [
            {
                icon: "스포츠",
                merchant: "SuperSports",
                point: 12000,
                curr: 324,
                date: new Date(2020, 10, 23, 19, 20, 0, 0),
                description: "포인트사용",
                taxfree: true,
                utu: false,
                save_point: 600,
            }, {
                icon: "카페",
                merchant: "Segafredo Zanetti Espresso",
                point: 5000,
                curr: 135,
                date: new Date(2020, 10, 23, 18, 45, 0, 0),
                description: "포인트사용",
                taxfree: false,
                utu: true,
                save_point: 50,
            }
        ],
        "10월 20일 화요일": [
            {
                icon: "포인트충전",
                merchant: "KB국민카드 해피Nori카드 충전",
                point: 100000,
                curr: 0,
                date: new Date(2020, 10, 20, 21, 0, 0, 0),
                description: "포인트 일반충전",
                taxfree: false,
                utu: false,
                save_point: 0,
            }, {
                icon: "포인트교환",
                merchant: "KB국민카드 포인트리 교환",
                point: 20000,
                curr: 0,
                date: new Date(2020, 10, 20, 20, 50, 0, 0),
                description: "포인트교환",
                taxfree: false,
                utu: false,
                save_point: 0,
            }
        ],
    }
    currency = "THB"

    constructor(private routerExtensions: RouterExtensions) {
        console.log(`${this.tag} constructor `)

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

    keyDescOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
        return a.key > b.key ? -1 : (b.key > a.key ? 1 : 0);
    }
    hiAmountOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
        return a.key > b.key ? -1 : (b.key > a.key ? 1 : 0);
    }

    callback_tab_tap(number){
        console.log(this.tag, "callback_tab_tap = ", number);
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
        // this.routerExtensions.navigate(['/main/home'], {
        //     clearHistory: true,
        //     transition: { instance : new CustomTransitionBack(250, AnimationCurve.linear) }
        // });
        this.routerExtensions.back();
    }

    navigateDetails(event) {
        console.log(this.tag + " navigateChargePoint");
        this.routerExtensions.navigate(['/main/tr/detail'], { transition: { instance: new CustomTransition(250, AnimationCurve.linear) } });

    }
}
