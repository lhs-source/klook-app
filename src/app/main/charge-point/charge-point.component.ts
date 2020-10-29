import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { AnimationCurve } from "@nativescript/core/ui/enums";
import { ActivatedRoute } from "@angular/router";
import { isAndroid, Application, AndroidApplication, AndroidActivityBackPressedEventData, LayoutBase, Color, TextField, TouchGestureEventData } from "tns-core-modules";
import * as app from "tns-core-modules/application";
import * as utils from "tns-core-modules/utils/utils";

import { screen } from "tns-core-modules/platform/platform"
import { alert } from "tns-core-modules/ui/dialogs";

import { CustomTransitionBack } from "../../util/klook-transition";
import { DataService } from "../../service/data.service";
import { TransactionService } from "../../service/transaction.service";
import { Subject } from "rxjs";


@Component({
    selector: "charge-point",
    templateUrl: "./charge-point.component.html",
    styleUrls: ["./charge-point.component.scss"]
})
export class ChargePointComponent implements OnInit {
    tag = this.constructor.name;

    title = "포인트 충전 > 일반충전";
    isNormal = true;
    isCard = true;

    // selected_way = {
    //     isCard:true,
    //     img:"~/images/img_kbcard.png",
    //     title:"KB국민카드 해피nori",
    //     number:"9445-****-****-****",
    //     balance: 1800000,
    // };


    // modal
    @ViewChild('modalframe', { static: true }) modalframe: ElementRef;
    @ViewChild('modal', { static: true }) modal: ElementRef;
    isModalShow = false;
    isKeypadShow = false;

    @ViewChild('modalkeypad', { static: true }) modalkeypad: ElementRef;

    sendKey: Subject<string> = new Subject();
    shortCut: Subject<number> = new Subject();

    constructor(private routerExtensions: RouterExtensions,
        private activatedRoute: ActivatedRoute,
        private dataService: DataService,
        private transactionService: TransactionService) {
        console.log(`${this.tag} constructor `)
        if (isAndroid) {
            Application.android.off(AndroidApplication.activityBackPressedEvent);
            Application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
                console.log("back button pressed on " + this.tag);
                data.cancel = true;
                if (this.isKeypadShow || this.isModalShow) {
                    this.onTapBack();
                } else {
                    this.routerExtensions.navigate(['/main/home'], { transition: { instance: new CustomTransitionBack(250, AnimationCurve.linear) }, clearHistory: true });
                }
            });

            // prevent the soft keyboard from showing initially when textfields are present
            app.android.startActivity.getWindow().setSoftInputMode(
                android.view.WindowManager.LayoutParams.SOFT_INPUT_ADJUST_PAN);
            app.android.startActivity.getWindow().setSoftInputMode(android.view.WindowManager.LayoutParams.SOFT_INPUT_STATE_ALWAYS_HIDDEN);

            utils.ad.dismissSoftInput();
        }
    }

    ngOnInit(): void {
        console.log(`${this.tag} ngOnInit`);
        console.log(this.routerExtensions.router.url);


        let modal = this.modal.nativeElement as LayoutBase;
        console.log(modal);
        modal.on('loaded', (a) => {
            let p = screen.mainScreen.heightDIPs / screen.mainScreen.heightPixels;
            setTimeout(() => {
                let height = modal.getMeasuredHeight() * p;
                console.log("height =", height);
                modal.animate({
                    translate: { x: modal.translateX, y: height },
                    duration: 250,
                })
            });
        });
        let kl = this.modalkeypad.nativeElement as LayoutBase;
        console.log(kl);
        kl.on('loaded', (a) => {
            let p = screen.mainScreen.heightDIPs / screen.mainScreen.heightPixels;
            setTimeout(() => {
                let height = kl.getMeasuredHeight() * p;
                console.log("height =", height);
                kl.animate({
                    translate: { x: kl.translateX, y: height },
                    duration: 250,
                })
            });
        });

        // let tf = this.amounttf.nativeElement as TextField;
        // tf.dismissSoftInput();
        // tf.android.setTextIsSelectable(true);
        // tf.android.setFocusable(false);
        // tf.android.setFocusableInTouchMode(true);
    }

    onBlur() {
        console.log("onBlur");
    }

    onTapBack() {
        console.log("tap frame");
        let kl = this.modalkeypad.nativeElement as LayoutBase;
        let modal = this.modal.nativeElement as LayoutBase;
        this.modal_hide(modal, this.isModalShow, () => { this.isModalShow = false });
        this.modal_hide(kl, this.isKeypadShow, () => { this.isKeypadShow = false });
    }

    callback_tapTab(index) {
        console.log(this.tag, "callback_tapTab =", index);
        if (index == 0) {
            this.title = "포인트 충전 > 일반충전";
            this.isNormal = true;
        } else {
            this.title = "포인트 충전 > 자동충전";
            this.isNormal = false;
        }
    }

    modal_show(target: LayoutBase, flag: Boolean, afterrun: Function) {
        if (flag === false) {
            let modalframe = this.modalframe.nativeElement as LayoutBase;
            let p = screen.mainScreen.heightDIPs / screen.mainScreen.heightPixels;
            let height = target.getMeasuredHeight() * p;

            modalframe.animate({
                backgroundColor: new Color(128, 48, 48, 48),
                duration: 250,
            });

            target.animate({
                translate: { x: target.translateX, y: 0 },
                duration: 250,
            }).then(() => {
                afterrun();
            });
        }
    }
    modal_hide(target: LayoutBase, flag: Boolean, afterrun: Function) {
        if (flag === true) {
            let modalframe = this.modalframe.nativeElement as LayoutBase;
            let p = screen.mainScreen.heightDIPs / screen.mainScreen.heightPixels;
            let height = target.getMeasuredHeight() * p;

            modalframe.animate({
                backgroundColor: new Color(0, 0, 0, 0),
                duration: 250,
            });

            target.animate({
                translate: { x: target.translateX, y: height },
                duration: 250,
            }).then(() => {
                afterrun();
            })
        }
    }

    // keypad //
    onTouchShortcut(event: TouchGestureEventData, point) {
        if (event.action !== "down") {
            return;
        }
        this.shortCut.next(point);
    }

    callbackTapTf(event, index) {
        console.log("callbackTapTf");
        let kl = this.modalkeypad.nativeElement as LayoutBase;
        this.modal_show(kl, this.isKeypadShow, () => {
            this.isKeypadShow = true;
        });
        // kf.android.setFocusableInTouchMode(true);
        // kf.focus();
    }
    callback_tapNumber(num) {
        console.log(this.tag, "callback_tapNumber =", num);
        if (num == 'enter') {
            let kl = this.modalkeypad.nativeElement as LayoutBase;
            this.modal_hide(kl, this.isKeypadShow, () => {
                this.isKeypadShow = false;
            });
        }
        else {
            this.sendKey.next(num);
        }
    }

    // lists //
    onTapWay() {
        console.log("onTapWay");
        // show or hide modal
        let frame = this.modalframe.nativeElement as LayoutBase;
        let modal = this.modal.nativeElement as LayoutBase;

        this.modal_show(modal, this.isModalShow, () => { this.isModalShow = true });
    }

    callback_selectWay(way) {
        // console.log(this.tag, "card =", card);

        let frame = this.modalframe.nativeElement as LayoutBase;
        let modal = this.modal.nativeElement as LayoutBase;
        frame.animate({
            backgroundColor: new Color(0, 0, 0, 0),
            duration: 250,
        });

        let p = screen.mainScreen.heightDIPs / screen.mainScreen.heightPixels;
        let height = modal.getMeasuredHeight() * p;

        this.isCard = way.isCard;

        modal.animate({
            translate: { x: modal.translateX, y: height },
            duration: 250,
        }).then(() => {
            if (way.isCard === true) {
                // this.selected_way.img = this.dataService.selected_way.img;
                // this.selected_way.title = this.dataService.selected_way.title;
                // this.selected_way.number = this.dataService.selected_way.number;
                // this.selected_way.balance = this.dataService.selected_way.balance;
            } else {
                // this.selected_way.img = this.dataService.selected_way.img;
                // this.selected_way.title = this.dataService.selected_way.title;
                // this.selected_way.number = this.dataService.selected_way.number;
                // this.selected_way.balance = this.dataService.selected_way.balance;
            }

            this.isModalShow = false;
        })
    }

    // actionbar emit click close
    actionbar_click_close(isclose) {
        console.log(this.tag + " actionbar close button clicked = " + isclose);

        this.routerExtensions.navigate(['/main/home'], {
            clearHistory: true,
            transition: { instance: new CustomTransitionBack(250, AnimationCurve.linear) }
        });
    }
}
