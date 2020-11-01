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

    @ViewChild('pro_pivot', { static: true }) pro_pivot: ElementRef;
    @ViewChild('pro', { static: true }) pro: ElementRef;

    // qr page variables
    isQrPay = false;
    isQrScan = false;
    isPay = false;
    isPayment = false;

    isMenuExt = false;
    menusize = 0;

    exitflag = false;

    trans_duration = 250;
    qr_anim_duration = 250;
    transition_duration = 250;

    pro_origin = 0;
    pro_extended = 0;
    p = screen.mainScreen.heightDIPs / screen.mainScreen.heightPixels;

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
                this.isPayment = true;
            } else if ('tr') {
                this.isPay = false;
                this.isQrScan = false;
                this.isQrPay = false;
                this.isPayment = false;

                let pro = this.pro.nativeElement as LayoutBase;
                pro.height = this.pro_origin;

                this.showMenuBtn();
            } else {

            }
        });

        if (isAndroid) {
            Application.android.off(AndroidApplication.activityBackPressedEvent);
            Application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
                console.log("back button pressed on " + this.tag);
                data.cancel = true;
                if (this.isPay || this.isQrPay || this.isQrScan) {
                    this.routerExtensions.navigate(['/main/home/tr-embedded'], {
                        clearHistory: true,
                        transition: { name: 'fade', duration: this.qr_anim_duration, curve: AnimationCurve.easeOut }
                    }).then(() => {
                        this.routingservice.emitChange('tr');
                    });
                } else {
                    if (this.exitflag === false) {
                        Toast.makeText("앱을 종료하려면 한 번 더 뒤로가기 버튼을 눌러주세요").show();
                        this.exitflag = true;
                        setTimeout(() => {
                            this.exitflag = false;
                        }, 2000);
                    } else {
                        exit();
                    }
                }
            });
        }
    }

    ngOnInit(): void {
        console.log(`${this.tag} ngOnInit`);
        console.log(this.routerExtensions.router.url);

        let menu = this.menu.nativeElement as LayoutBase;
        menu.on('loaded', (arg) => {
            setTimeout(() => {
                this.menusize = menu.getMeasuredHeight() * this.p;
                console.log('loaded', this.menusize);

                // menu.opacity = 0;
                menu.height = 1;
            });
        });
    }
    ngOnDestroy() {
        console.log(`${this.tag} ngOnDestroy`);
    }

    showMenu() {
        let menu = this.menu.nativeElement as LayoutBase;
        this.isMenuExt = !this.isMenuExt;
        // menu.opacity = 1;
        menu.animate({
            height: this.menusize,
            duration: this.trans_duration,
            curve: AnimationCurve.easeOut
        });
    }
    hideMenu() {
        let menu = this.menu.nativeElement as LayoutBase;
        menu.animate({
            height: 1,
            duration: this.trans_duration,
            curve: AnimationCurve.easeOut
        }).then(() => {
            // menu.opacity = 0;
            this.isMenuExt = !this.isMenuExt;
        });
    }
    showMenuBtn() {
        let img = this.menubtn.nativeElement as Image;
        img.animate({
            height: 24,
            opacity: 1,
            duration: this.trans_duration,
            curve: AnimationCurve.easeOut
        });
    }
    hideMenuBtn() {
        let img = this.menubtn.nativeElement as Image;

        img.animate({
            height: 1,
            opacity: 0,
            duration: this.trans_duration,
            curve: AnimationCurve.easeOut
        });
    }

    onTapMenu(event) {
        if (this.isQrScan === true || this.isQrPay === true || this.isPay === true) {
            return;
        }
        // let img = this.menubtn.nativeElement as Image;
        let menu = this.menu.nativeElement as LayoutBase;
        let h = menu.getMeasuredHeight();
        let item_height = 92;

        if (this.isMenuExt === false) {
            // unfold
            this.showMenu();
        } else if (this.isMenuExt === true) {
            // fold
            this.hideMenu();
        }
    }

    onLoadedTapbtn(event) {
        let btn = event.arg as Image;
        // btn.animate();
    }

    onLoadedPivot(event) {
        console.log(this.tag + " onLoadedPivot pivot");
        let pro = this.pro.nativeElement as LayoutBase;
        let pivot = event.object as LayoutBase;

        pro.on('loaded', (view) => {
            console.log(this.tag + "  loaded");
            let v = view.object as LayoutBase;
            setTimeout(() => {
                let loc = v.getLocationOnScreen();
                // console.log(loc);

                let height = pivot.getMeasuredHeight();
                console.log(height);
                this.pro_origin = height * this.p + 16;
                this.pro_extended = height * this.p + 16 + 32;
                pro.height = this.pro_origin;


                let gap = pivot.getLocationRelativeTo(v);
                console.log(gap);
                pro.translateY = gap.y - 8;

            });
        });
        pivot.on('layoutChanged', (arg)=>{
            let height = pivot.getMeasuredHeight();
            // console.log('layoutChanged',height);
            pro.height = height  * this.p + 32;
        });
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
            let menu = this.menu.nativeElement as LayoutBase;

            // let pro = this.pro.nativeElement as LayoutBase;
            // pro.height = this.pro_extended;


            this.hideMenuBtn();
            if (this.isMenuExt === true) {
                // fold
                this.hideMenu();
            }
            this.isQrScan = true;
            this.isQrPay = false;
            this.isPay = false;
            this.routerExtensions.navigate(['/main/home/qr-scan'], {
                transition: { name: 'fade', duration: this.qr_anim_duration, curve: AnimationCurve.easeOut },
                clearHistory: true
            }).then(() => {
                this.isPayment = true;
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
            let menu = this.menu.nativeElement as LayoutBase;

            // let pro = this.pro.nativeElement as LayoutBase;
            // pro.height = this.pro_extended;

            this.hideMenuBtn();
            if (this.isMenuExt === true) {
                // fold
                this.hideMenu();
            }
            this.isQrScan = false;
            this.isQrPay = true;
            this.isPay = false;
            this.routerExtensions.navigate(['/main/home/qr-pay'], {
                transition: { name: 'fade', duration: this.qr_anim_duration, curve: AnimationCurve.easeOut }, clearHistory: true
            }).then(() => {
                this.isPayment = true;
            });
        }

    }
    // show Transaction embedded view
    actionbar_click_close(event) {
        console.log(this.tag + " navigateTrEmb");
        if (this.isQrPay === true) {
            this.routerExtensions.navigate(['/main/home/tr-embedded'], {
                transition: { name: 'fade', duration: this.qr_anim_duration, curve: AnimationCurve.easeOut }
            });
            this.isQrPay = false;
        }
        if (this.isQrScan === true) {
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

        this.showMenuBtn();

        this.isPayment = false;

        let pro = this.pro.nativeElement as LayoutBase;
        pro.height = this.pro_origin;
    }

    // country_select
    callback_select_country(event) {
        // this.exchange = Math.floor(this.dataService.point / this.countryService.exchange);
    }
}
