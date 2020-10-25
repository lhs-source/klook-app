import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";

import { AnimationCurve } from "@nativescript/core/ui/enums";
import { LayoutBase, Image } from "@nativescript/core/ui";
import { isAndroid, screen } from "tns-core-modules/platform/platform"
import { Application, AndroidApplication, AndroidActivityBackPressedEventData, Color } from "tns-core-modules";
import { exit } from "nativescript-exit";
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
    @ViewChild('octopus', { static: true }) octopus: ElementRef;
    @ViewChild('octopuscard', { static: true }) octopuscard: ElementRef;
    @ViewChild('octopusframe', { static: true }) octopusframe: ElementRef;

    @ViewChild('rootlayout', { static: true }) rootlayout: ElementRef;
    @ViewChild('menubtn', { static: true }) menubtn: ElementRef;
    @ViewChild('menu', { static: true }) menu: ElementRef;
    @ViewChild('qrbg', { static: true }) qrbg: ElementRef;

    // qr page variables
    isQrPay = false;
    isQrScan = false;
    isPay = false;

    isMenuExt = false;
    isDeactive = false;

    trans_duration = 250;
    qr_anim_duration = 250;
    transition_duration = 250;

    // octopus pan vairables
    octopus_card_loc = {
        prevDeltaX: 0,
        prevDeltaY: 0,
        originX: 0,
        originY: 0,
    };
    octopus_frame_loc = {
        originX: 0,
        originY: 0,
    }

    card_height = 420;
    card_marginTop = 8;

    // data
    exchange = 0;


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
                this.updatePoint();
            } else {

            }
        });

        this.updatePoint();

        if (isAndroid) {
            Application.android.off(AndroidApplication.activityBackPressedEvent);
            Application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
                console.log("back button pressed on " + this.tag);
                data.cancel = true;
                // this.routerExtensions.navigate(['/main/home'], {clearHistory : true});
                // exit();
            });
        }
    }

    ngOnInit(): void {
        console.log(`${this.tag} ngOnInit`);
        console.log(this.routerExtensions.router.url);

        let menu = this.menu.nativeElement as LayoutBase;
    }
    ngOnDestroy() {
        console.log(`${this.tag} ngOnDestroy`);
    }

    updatePoint() {
        this.exchange = Math.floor(this.dataService.point / this.countryService.exchange);
    }

    onLoadedMenu(event) {
        let menu = this.menu.nativeElement as LayoutBase;
        // menu.effectiveHeight = menu.getMeasuredHeight() - 96;
    }

    onLoadedMenuItem(event) {
        console.log(this.tag + " onLoadedMenuItem ");

    }
    onTapMenu(event) {
        if (this.isQrScan == true || this.isQrPay == true) {
            return;
        }
        let img = this.menubtn.nativeElement as Image;
        let menu = this.menu.nativeElement as LayoutBase;
        console.log("height = " + menu.getMeasuredHeight());
        console.log(img);
        console.log("height = " + menu.getMeasuredHeight());
        let h = menu.getMeasuredHeight();
        let item_height = 92;

        // console.log(screen.mainScreen.heightDIPs);
        // console.log(screen.mainScreen.heightPixels);
        let p = screen.mainScreen.heightDIPs / screen.mainScreen.heightPixels;
        console.log("p = ", screen.mainScreen.heightDIPs);

        if (this.isMenuExt === false) {
            // unfold
            this.isMenuExt = !this.isMenuExt;
            img.src = "~/images/btn_down.png"
            console.log("height = " + menu.getMeasuredHeight());
            menu.animate({
                height: h * p + item_height,
                duration: this.trans_duration,
                curve: AnimationCurve.easeOut
            }).then(() => {
                console.log("end height = " + menu.getMeasuredHeight());
            });
        } else if (this.isMenuExt === true) {
            // fold
            img.src = "~/images/btn_up.png"
            console.log("height = " + menu.getMeasuredHeight());
            menu.animate({
                height: h * p - item_height,
                duration: this.trans_duration,
                curve: AnimationCurve.easeOut
            }).then(() => {
                console.log("end height = " + menu.getMeasuredHeight());
                this.isMenuExt = !this.isMenuExt;
            });
        }
    }

    navigateOnlinepay(event) {
        console.log(this.tag + " navigateOnlinepay");
        if(this.isDeactive === true){
            return;
        }
        // this.routerExtensions.navigate(['/main/onlinepay'], { transition: { instance : new CustomTransition(this.trans_duration, AnimationCurve.easeOut) }, clearHistory: true });
        this.routerExtensions.navigate(['/main/onlinepay'], { transition: { instance: new CustomTransition(this.trans_duration, AnimationCurve.linear) }, clearHistory: true });
    }
    navigateChargePoint(event) {
        console.log(this.tag + " navigateChargePoint");
        this.routerExtensions.navigate(['/main/charge-point'], { transition: { instance: new CustomTransition(this.trans_duration, AnimationCurve.linear) }, clearHistory: true });

    }
    navigateChangePoint(event) {
        console.log(this.tag + " navigateChangePoint");
        this.routerExtensions.navigate(['/main/change-point'], { transition: { instance: new CustomTransition(this.trans_duration, AnimationCurve.linear) }, clearHistory: true });

    }
    navigateTransaction(event) {
        console.log(this.tag + " navigateTransaction");
        this.routerExtensions.navigate(['/main/tr'], { transition: { instance: new CustomTransition(this.trans_duration, AnimationCurve.linear) }, clearHistory: true });

    }
    navigateAccount(event) {
        console.log(this.tag + " navigateAccount");
        this.routerExtensions.navigate(['/main/account'], { transition: { instance: new CustomTransition(this.trans_duration, AnimationCurve.linear) }, clearHistory: true });

    }
    onTapDeactive() {
        this.authService.is_deactive = !this.authService.is_deactive;
        this.isDeactive = !this.isDeactive;
        console.log(this.isDeactive);
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
        if(this.isDeactive === true){
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
        if(this.isDeactive === true){
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
            this.routerExtensions.navigate(['/main/home/qr-pay'], { transition: { name: 'fade', duration: this.qr_anim_duration, curve: AnimationCurve.easeOut }, clearHistory: true }).then(() => {
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
    callback_select_country(event){
        this.exchange = Math.floor(this.dataService.point / this.countryService.exchange);
    }

    // translate octopus view to bottom of screen
    onLoadOctopus(event) {
        console.log(this.tag + " onLoadOctopus");
        let lbc = this.octopuscard.nativeElement as LayoutBase;
        let lbf = this.octopusframe.nativeElement as LayoutBase;
        let lb = this.octopus.nativeElement as LayoutBase;
        console.log(screen.mainScreen.heightDIPs);
        console.log(screen.mainScreen.heightPixels);
        // lbc.translateY = screen.mainScreen.heightDIPs / 2;
        lbc.translateY = screen.mainScreen.heightDIPs - 124;
        lbf.translateY = lbc.translateY - this.card_marginTop;
    }

    onPan(event) {
        // console.log("onDragCard HomeComponent");
        let lbc = this.octopuscard.nativeElement as LayoutBase;
        let lbf = this.octopusframe.nativeElement as LayoutBase;
        let lb = this.octopus.nativeElement as LayoutBase;

        if (event.state === 1) // down
        {
            this.octopus_card_loc.originX = lbc.translateX;
            this.octopus_card_loc.originY = lbc.translateY;
            this.octopus_card_loc.prevDeltaY = 0;

            this.octopus_frame_loc.originX = lbf.translateX;
            this.octopus_frame_loc.originY = lbf.translateY;
        }
        else if (event.state === 2) // panning
        {
            if (lbc.translateY < screen.mainScreen.heightDIPs / 2) {
                // low velocity
                lbc.translateY += (event.deltaY - this.octopus_card_loc.prevDeltaY) / 2;
                lbf.translateY += (event.deltaY - this.octopus_card_loc.prevDeltaY) / 2;
            } else {
                // normal veloc
                lbc.translateY += event.deltaY - this.octopus_card_loc.prevDeltaY;
                lbf.translateY += event.deltaY - this.octopus_card_loc.prevDeltaY;
            }

            this.octopus_card_loc.prevDeltaY = event.deltaY;

            lb.opacity = (1 - (lbc.translateY / screen.mainScreen.heightDIPs)) / 2;
            if (lb.opacity > 1) {
                lb.opacity = 1;
            } else if (lb.opacity < 0) {
                lb.opacity = 0;
            }

            lbf.opacity = (1 - (lbc.translateY / screen.mainScreen.heightDIPs)) * 1.5;
            console.log(lbf.opacity);
            if (lbf.opacity > 1) {
                lbf.opacity = 1;
            } else if (lbf.opacity < 0) {
                lbf.opacity = 0;
            }
        }
        else if (event.state === 3) // up
        {
            console.log("lbc.translateY  => " + lbc.translateY);
            console.log("event.deltaY  => " + event.deltaY);
            let p = screen.mainScreen.heightDIPs / screen.mainScreen.heightPixels;
            if (lbc.translateY < (screen.mainScreen.heightDIPs / 1.5)) {
                // goto octopus page
                lbc.animate({
                    translate: { x: this.octopus_card_loc.originX, y: (screen.mainScreen.heightDIPs - lbc.getMeasuredHeight() * p) / 3 },
                    duration: 150,
                    curve: AnimationCurve.easeInOut
                }).then(() => {
                    this.routerExtensions.navigate(['/main/octopus'], { clearHistory: true, transition: { name: 'fada', duration: this.trans_duration, curve: AnimationCurve.easeOut } });
                });
                lbf.animate({
                    translate: { x: this.octopus_frame_loc.originX, y: (screen.mainScreen.heightDIPs - lbc.getMeasuredHeight() * p) / 3 - this.card_marginTop },
                    opacity: 1,
                    duration: 150,
                    curve: AnimationCurve.easeInOut
                })
            } else {
                // goto origin location
                lbc.animate({
                    translate: { x: this.octopus_card_loc.originX, y: this.octopus_card_loc.originY },
                    duration: this.trans_duration,
                    curve: AnimationCurve.easeOut
                });
                lb.animate({
                    opacity: 0,
                    duration: this.trans_duration,
                    curve: AnimationCurve.easeOut
                });
                lbc.translateX = this.octopus_card_loc.originX;
                lbc.translateY = this.octopus_card_loc.originY;


                lbf.animate({
                    translate: { x: this.octopus_frame_loc.originX, y: this.octopus_frame_loc.originY },
                    opacity: 0,
                    duration: 100,
                    curve: AnimationCurve.easeOut
                })
            }
        }
    }

    // translate octopus card to top of the screen and
    // navigate to octopus
    navigateOctopus(event) {
        console.log(this.tag + " navigateOctopus");

        let lbc = this.octopuscard.nativeElement as LayoutBase;
        let lb = this.octopus.nativeElement as LayoutBase;
        console.log(lbc.getLocationInWindow());
        console.log(lbc.getLocationOnScreen());
        console.log(lbc.getLocationRelativeTo(lbc.parentNode.viewController));
        lb.animate({
            opacity: 0.5,
            duration: this.trans_duration,
            curve: AnimationCurve.easeOut
        });
        lbc.animate({
            translate: { x: lbc.translateX, y: 0 },
            duration: this.trans_duration,
            curve: AnimationCurve.easeOut
        }).then(() => {
            lbc.animate({
                translate: { x: lbc.translateX, y: 30 },
                duration: 100,
                curve: AnimationCurve.easeOut
            }).then(() => {
                lbc.animate({
                    translate: { x: lbc.translateX, y: 15 },
                    duration: 80,
                    curve: AnimationCurve.easeOut
                }).then(() => {
                    this.routerExtensions.navigate(['/main/octopus'], { clearHistory: true, transition: { name: 'fada', duration: this.trans_duration, curve: AnimationCurve.easeOut } });
                });
            });
        });
    }
}
