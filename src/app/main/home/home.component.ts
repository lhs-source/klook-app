import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { AnimationCurve } from "@nativescript/core/ui/enums";
import { LayoutBase, Image } from "@nativescript/core/ui";
import { isAndroid, screen } from "tns-core-modules/platform/platform"
import { Application, AndroidApplication, AndroidActivityBackPressedEventData, Color } from "tns-core-modules";
import { exit } from "nativescript-exit";

import * as Toast from 'nativescript-toast';

import { CustomTransition, CustomTransitionBack } from '../../util/klook-transition';
import { HomeRoutingService } from "./home-routing.service";
import { DataService } from "../../service/data.service";
import { AuthService } from "../../service/auth.service";
import { CountryService } from "../../service/country.service";

@Component({
    selector: "home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
    tag = this.constructor.name;
    @ViewChild('rootlayout', { static: true }) rootlayout: ElementRef;
    @ViewChild('menubtn', { static: true }) menubtn: ElementRef;
    @ViewChild('menu', { static: true }) menu: ElementRef;
    @ViewChild('qrbg', { static: true }) qrbg: ElementRef;

    // qr page variables
    isQrPay = false;
    isQrScan = false;
    isPay = false;

    isMenuExt = false;

    exitflag = false;

    trans_duration = 250;
    qr_anim_duration = 250;
    transition_duration = 250;

    constructor(private routerExtensions: RouterExtensions,
        private routingservice: HomeRoutingService,
        private dataService: DataService,
        private countryService: CountryService,
        private authService: AuthService) {
        console.log(`${this.tag} constructor `)

        console.log(this.tag, "then", this.authService.info);
        this.routingservice.changeEmitted$.subscribe(url => {
            console.log("emitted ", url);
            if (url === 'pay') {
                this.isPay = true;
                this.isQrScan = false;
                this.isQrPay = false;

                let bg = this.qrbg.nativeElement as LayoutBase;
                bg.borderWidth = 1;
                // bg.borderColor = "#bbb";
                bg.animate({
                    opacity: 1,
                    backgroundColor: new Color(0, 255, 255, 255),
                    duration: this.qr_anim_duration,
                    curve: AnimationCurve.easeOut
                }).then(() => {
                    bg.borderColor = "#ddd";
                });
            } else if ('tr') {
                this.isPay = false;
                this.isQrScan = false;
                this.isQrPay = false;

                let bg = this.qrbg.nativeElement as LayoutBase;
                bg.animate({
                    opacity: 0,
                    duration: this.qr_anim_duration,
                    curve: AnimationCurve.easeOut
                });
            } else {

            }
        });


        if (isAndroid) {
            Application.android.off(AndroidApplication.activityBackPressedEvent);
            Application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
                console.log("back button pressed on " + this.tag);
                data.cancel = true;
                // this.routerExtensions.navigate(['/main/home'], {clearHistory : true});
                // exit();
                if (this.exitflag === false) {
                    Toast.makeText("앱을 종료하려면 한 번 더 뒤로가기 버튼을 눌러주세요").show();
                    this.exitflag = true;
                    setTimeout(() => {
                        this.exitflag = false;
                    }, 2000);
                } else {
                    exit();
                }
            });
        }
    }

    ngOnInit(): void {
        console.log(`${this.tag} ngOnInit`);
        console.log(this.routerExtensions.router.url);
    }
    ngOnDestroy() {
        console.log(`${this.tag} ngOnDestroy`);
    }
    onTapMenu(event) {
        if (this.isQrScan === true || this.isQrPay === true || this.isPay === true) {
            return;
        }
        let p = screen.mainScreen.heightDIPs / screen.mainScreen.heightPixels;
        let img = this.menubtn.nativeElement as Image;
        let menu = this.menu.nativeElement as LayoutBase;
        let h = menu.getMeasuredHeight();
        let item_height = 92;

        if (this.isMenuExt === false) {
            // unfold
            this.isMenuExt = !this.isMenuExt;
            menu.animate({
                height: h * p + item_height,
                duration: this.trans_duration,
                curve: AnimationCurve.easeOut
            });
        } else if (this.isMenuExt === true) {
            // fold
            img.src = "~/images/btn_up.png"
            menu.animate({
                height: h * p - item_height,
                duration: this.trans_duration,
                curve: AnimationCurve.easeOut
            }).then(() => {
                this.isMenuExt = !this.isMenuExt;
            });
        }
    }

    navigateOnlinepay(event) {
        console.log(this.tag + " navigateOnlinepay");
        if (this.authService.is_deactive === true) {
            return;
        }
        this.routerExtensions.navigate(['/main/onlinepay'], {
            transition: { instance: new CustomTransition(this.trans_duration, AnimationCurve.linear) }, clearHistory: true
        });
    }
    navigateChargePoint(event) {
        console.log(this.tag + " navigateChargePoint");
        this.routerExtensions.navigate(['/main/charge-point'], {
            transition: { instance: new CustomTransition(this.trans_duration, AnimationCurve.linear) }, clearHistory: true
        });

    }
    navigateChangePoint(event) {
        console.log(this.tag + " navigateChangePoint");
        this.routerExtensions.navigate(['/main/change-point'], {
            transition: { instance: new CustomTransition(this.trans_duration, AnimationCurve.linear) }, clearHistory: true
        });

    }
    navigateTransaction(event) {
        console.log(this.tag + " navigateTransaction");
        this.routerExtensions.navigate(['/main/tr'], {
            transition: { instance: new CustomTransition(this.trans_duration, AnimationCurve.linear) }, clearHistory: true
        });

    }
    navigateAccount(event) {
        console.log(this.tag + " navigateAccount");
        this.routerExtensions.navigate(['/main/account'], {
            transition: { instance: new CustomTransition(this.trans_duration, AnimationCurve.linear) }, clearHistory: true
        });

    }
    onTapDeactive() {
        this.authService.is_deactive = !this.authService.is_deactive;
        console.log(this.authService.is_deactive);
    }
    test() {

        this.routerExtensions.navigate(['/main/test'], {
            clearHistory: true,
            transition: { instance: new CustomTransitionBack(250, AnimationCurve.linear) }
        });
    }

    // start QR Scan 
    navigateQrScan(event) {
        console.log(this.tag + " navigateQrScan");
        if (this.authService.is_deactive === true) {
            return;
        }
        if (this.isQrScan == false) {

            let img = this.menubtn.nativeElement as Image;
            let menu = this.menu.nativeElement as LayoutBase;
            let p = screen.mainScreen.heightDIPs / screen.mainScreen.heightPixels;

            if (this.isMenuExt === true) {
                // fold
                img.src = "~/images/btn_up.png"
                console.log("height = " + menu.getMeasuredHeight());
                menu.animate({
                    height: 374 * p,
                    duration: this.trans_duration,
                    curve: AnimationCurve.easeOut
                }).then(() => {
                    console.log("end height = " + menu.getMeasuredHeight());
                    this.isMenuExt = !this.isMenuExt;
                });
            }
            this.isQrScan = true;
            this.isQrPay = false;
            this.routerExtensions.navigate(['/main/home/qr-scan'], { transition: { name: 'fade', duration: this.qr_anim_duration, curve: AnimationCurve.easeOut }, clearHistory: true }).then(() => {
                let bg = this.qrbg.nativeElement as LayoutBase;
                // bg.backgroundColor = "#333";
                bg.borderWidth = 0;
                // bg.borderWidth = 1;
                bg.animate({
                    opacity: 1,
                    backgroundColor: new Color("#333"),
                    duration: this.qr_anim_duration,
                    curve: AnimationCurve.easeOut
                }).then(() => {
                    // bg.borderColor = "#333";
                });
            });
        }
    }
    // start QR Pay
    navigateQrPay(event) {
        console.log(this.tag + " navigateQrPay");
        if (this.authService.is_deactive === true) {
            return;
        }
        if (this.isQrPay == false) {

            let img = this.menubtn.nativeElement as Image;
            let menu = this.menu.nativeElement as LayoutBase;
            let p = screen.mainScreen.heightDIPs / screen.mainScreen.heightPixels;

            if (this.isMenuExt === true) {
                // fold
                img.src = "~/images/btn_up.png"
                console.log("height = " + menu.getMeasuredHeight());
                menu.animate({
                    height: 374 * p,
                    duration: this.trans_duration,
                    curve: AnimationCurve.easeOut
                }).then(() => {
                    console.log("end height = " + menu.getMeasuredHeight());
                    this.isMenuExt = !this.isMenuExt;
                });
            }
            this.isQrScan = false;
            this.isQrPay = true;
            this.routerExtensions.navigate(['/main/home/qr-pay'], {
                transition: { name: 'fade', duration: this.qr_anim_duration, curve: AnimationCurve.easeOut }, clearHistory: true
            }).then(() => {
                let bg = this.qrbg.nativeElement as LayoutBase;
                bg.borderWidth = 1;
                // bg.borderColor = "#bbb";
                bg.animate({
                    opacity: 1,
                    backgroundColor: new Color(0, 255, 255, 255),
                    duration: this.qr_anim_duration,
                    curve: AnimationCurve.easeOut
                }).then(() => {
                    bg.borderColor = "#ddd";
                });
            });
        }

    }
    // show Transaction embedded view
    actionbar_click_close(event) {
        console.log(this.tag + " navigateTrEmb");
        if (this.isQrPay == true) {
            this.routerExtensions.navigate(['/main/home/tr-embedded'], {
                transition: { name: 'fade', duration: this.qr_anim_duration, curve: AnimationCurve.easeOut }
            });
            this.isQrPay = false;
        }
        if (this.isQrScan == true) {
            this.routerExtensions.navigate(['/main/home/tr-embedded'], {
                transition: { name: 'fade', duration: this.qr_anim_duration, curve: AnimationCurve.easeOut }
            });
            this.isQrScan = false;
        }
        if (this.isPay === true) {
            this.routerExtensions.navigate(['/main/home/tr-embedded'], {
                transition: { name: 'fade', duration: this.qr_anim_duration, curve: AnimationCurve.easeOut }
            });
            this.isPay = false;
        }

        let bg = this.qrbg.nativeElement as LayoutBase;
        bg.animate({
            opacity: 0,
            duration: this.qr_anim_duration,
            curve: AnimationCurve.easeOut
        });
    }

    // country_select
    callback_select_country(event) {
        // this.exchange = Math.floor(this.dataService.point / this.countryService.exchange);
    }
}
