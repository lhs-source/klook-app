import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { AnimationCurve } from "@nativescript/core/ui/enums";
import { Application, AndroidApplication, AndroidActivityBackPressedEventData, isAndroid, EventData, LayoutBase, View, Color } from "tns-core-modules";
import { CubicBezierAnimationCurve } from "@nativescript/core/ui/animation";
import { screen } from "tns-core-modules/platform";

import { CustomTransition, CustomTransitionBack } from "../../home/klook-transition";
import { animate, JsAnimationDefinition } from "./animation-helpers";
import { KeyValue } from "@angular/common";

@Component({
    selector: "tr-history",
    templateUrl: "./tr-history.component.html",
    styleUrls: ["./tr-history.component.scss"]
})
export class TrHistoryComponent implements OnInit {
    tag = this.constructor.name;

    // tab
    @ViewChild('tab', { static: true }) tab: ElementRef;
    tab_view = [];

    today = Date.now();
    use_point = 150000;
    stack_point = 4120;

    // trs
    icons = {
        "department": "~/images/ico_type2.png",
        "grocery": "~/images/ico_type3.png",
        "restorant": "~/images/ico_type5.png",
        "point": "~/images/ico_type1.png",
        "mart": "~/images/ico_type4.png",
        "sport": "~/images/ico_type6.png",
        "cafe": "~/images/ico_type7.png",
        "exchange": "~/images/ico_type8.png",
    };
    trs = {
        "10월 30일 금요일": [
            {
                icon: "department",
                merchant: "Central Department Store",
                point: 25000,
                curr: 676,
                date: new Date(2020, 10, 30, 14, 23, 0, 0),
                description: "포인트사용",
                taxfree: true,
                utu: false,
                save_point: 1250,
            }, {
                icon: "grocery",
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
                icon: "point",
                merchant: "KB국민카드 Nori카드 충전",
                point: 100000,
                curr: 0,
                date: new Date(2020, 10, 27, 21, 10, 0, 0),
                description: "포인트 일반충전",
                taxfree: false,
                utu: false,
                save_point: 0,
            }
        ]
    }

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

        // tab init
        // let lb = args.object as LayoutBase;
        let lb = this.tab.nativeElement as LayoutBase;
        let rootView = lb.parentNode.getViewById("selected") as View;
        let p = screen.mainScreen.heightDIPs / screen.mainScreen.heightPixels;

        lb.eachChildView((view: View) => {
            if (view.className === "selected") {
                return;
            }
            this.tab_view.push(view);

            let temp_color = new Color("black");
            let origin_color = new Color("#888");

            // first sel elems
            if (this.tab_view.length === 1) {
                view.on('loaded', (a) => {
                    console.log(view);
                    let color_anim: JsAnimationDefinition = {
                        curve: t => t,
                        getRange: () => { return { from: view.color.r, to: temp_color.r }; },
                        step: (v) => view.color = new Color(255, v, v, v)
                    };
                    animate(250, [color_anim]);

                    setTimeout(() => {
                        let label = a.object as View;
                        let loc = label.getLocationRelativeTo(lb);
                        let width = label.getMeasuredWidth();
                        console.log(loc);
                        console.log(width);
                        // rootView.animate({
                        //     translate: { x: loc.x, y: 0 },
                        //     width:width * p,
                        //     duration: 250,
                        //     curve: new CubicBezierAnimationCurve(0.6, 0.72, 0, 1)
                        // });
                    });
                });
            }

            view.on("tap", (a: EventData) => {
                let label = a.object as View;
                let loc = label.getLocationRelativeTo(lb);
                // console.log(loc);
                let width = label.getMeasuredWidth();

                // v = variation
                // step: (v) => label.color = new Color(255, v, v, v)
                let color_anim: JsAnimationDefinition = {
                    curve: t => t,
                    getRange: () => { return { from: label.color.r, to: temp_color.r }; },
                    step: (v) => label.color = new Color(255, v, v, v)
                };
                animate(250, [color_anim]);
                this.tab_view.forEach((t) => {
                    if (t !== label) {
                        let color_anim: JsAnimationDefinition = {
                            curve: t => t,
                            getRange: () => { return { from: t.color.r, to: origin_color.r }; },
                            step: (v) => t.color = new Color(255, v, v, v)
                        };
                        animate(250, [color_anim]);
                    }
                });
                rootView.animate({
                    translate: { x: loc.x, y: 0 },
                    width: width * p,
                    duration: 250,
                    curve: new CubicBezierAnimationCurve(0.6, 0.72, 0, 1)
                });
            });

            return true;
        });
    }

    keyDescOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
        return a.key > b.key ? -1 : (b.key > a.key ? 1 : 0);
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
