import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";

import { AnimationCurve } from "@nativescript/core/ui/enums";
import { LayoutBase, Image } from "@nativescript/core/ui";
import { screen } from "tns-core-modules/platform/platform"

@Component({
    selector: "home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
    @ViewChild('octopus', { static: true }) octopus: ElementRef;
    @ViewChild('octopuscard', { static: true }) octopuscard: ElementRef;
    @ViewChild('rootlayout', { static: true }) rootlayout: ElementRef;
    @ViewChild('menubtn', { static: true }) menubtn: ElementRef;
    @ViewChild('menu', { static: true }) menu: ElementRef;
    @ViewChild('menuitems', { static: true }) menuitems: ElementRef;

    // qr page variables
    isQrPay = false;
    isQrScan = false;

    isMenuExt = false;

    // octopus pan vairables
    octopus_card_loc = {
        prevDeltaX : 0,
        prevDeltaY : 0,
        originX : 0,
        originY : 0,
    };

    constructor(private routerExtensions: RouterExtensions) {
        console.log("constructor HomeComponent");

    }

    ngOnInit(): void {
        console.log("ngOnInit HomeComponent");
        console.log(this.routerExtensions.router.url);
        
        let menu = this.menu.nativeElement as LayoutBase;
    }

    ngAfterViewInit() {

    }

    onLoadedMenu(event){
        let menu = this.menu.nativeElement as LayoutBase;
        menu.effectiveHeight = menu.getMeasuredHeight() - 96;
        console.log(menu.effectiveHeight);
        console.log(menu.getMeasuredHeight());
        console.log(menu.getActualSize());
    }

    onLoadedMenuItem(event){
        console.log("onLoadedMenuItem");
        let menuitems = this.menuitems.nativeElement as LayoutBase;
        console.log(menuitems.translateY);
        console.log(menuitems.getLocationInWindow());
        console.log(menuitems.getLocationOnScreen());
        console.log(menuitems.getLocationRelativeTo(menuitems.parentNode.viewController));
        menuitems.translateY = menuitems.translateY - 96;
    }
    onTapMenu(event){
        if(this.isQrScan == true || this.isQrPay == true){
            return;
        }
        let img = this.menubtn.nativeElement as Image;
        let menu = this.menu.nativeElement as LayoutBase;
        console.log("height = " + menu.getMeasuredHeight());
        console.log(img);
        console.log("height = " + menu.getMeasuredHeight());
        let h = menu.getMeasuredHeight();

        console.log(screen.mainScreen.heightDIPs);
        console.log(screen.mainScreen.heightPixels);
        let p = screen.mainScreen.heightDIPs / screen.mainScreen.heightPixels;
        console.log(p);
        if(this.isMenuExt === false){
            // unfold
            this.isMenuExt = !this.isMenuExt;
            img.src = "~/images/btn_down.png"
            console.log("height = " + menu.getMeasuredHeight());
            menu.animate({
                height: 678 * p - 16,
                duration:250,
                curve: AnimationCurve.easeOut
            }).then(()=>{
                console.log("end height = " + menu.getMeasuredHeight());
            });            
        }else if(this.isMenuExt === true){
            // fold
            img.src = "~/images/btn_up.png"
            console.log("height = " + menu.getMeasuredHeight());
            menu.animate({
                height: 374 * p,
                duration:250,
                curve: AnimationCurve.easeOut
            }).then(()=>{
                console.log("end height = " + menu.getMeasuredHeight());
                this.isMenuExt = !this.isMenuExt;
            });
        }
    }

    navigateOnlinepay(event) {
        console.log("navigateOnlinepay HomeComponent");
        this.routerExtensions.navigate(['/main/onlinepay'], { transition: { name: 'fade', duration: 350, curve: AnimationCurve.easeOut } });

    }
    navigateChargePoint(event) {
        console.log("navigateChargePoint HomeComponent");
        this.routerExtensions.navigate(['/main/charge-point'], { transition: { name: 'fade', duration: 350, curve: AnimationCurve.easeOut } });

    }
    navigateChangePoint(event) {
        console.log("navigateChangePoint HomeComponent");
        this.routerExtensions.navigate(['/main/change-point'], { transition: { name: 'fade', duration: 350, curve: AnimationCurve.easeOut } });

    }
    navigateTransaction(event) {
        console.log("navigateTransaction HomeComponent");
        this.routerExtensions.navigate(['/main/tr'], { transition: { name: 'fade', duration: 350, curve: AnimationCurve.easeOut } });

    }
    navigateAccount(event) {
        console.log("navigateAccount HomeComponent");
        this.routerExtensions.navigate(['/main/account'], { transition: { name: 'fade', duration: 350, curve: AnimationCurve.easeOut } });

    }


    // start QR Scan 
    navigateQrScan(event) {
        console.log("navigateQrScan HomeComponent");
        if (this.isQrScan == false) {
            
            let img = this.menubtn.nativeElement as Image;
            let menu = this.menu.nativeElement as LayoutBase;
            let p = screen.mainScreen.heightDIPs / screen.mainScreen.heightPixels;
            
            if(this.isMenuExt === true){
                // fold
                img.src = "~/images/btn_up.png"
                console.log("height = " + menu.getMeasuredHeight());
                menu.animate({
                    height: 374 * p,
                    duration:250,
                    curve: AnimationCurve.easeOut
                }).then(()=>{
                    console.log("end height = " + menu.getMeasuredHeight());
                    this.isMenuExt = !this.isMenuExt;
                });
            }
            
            this.routerExtensions.navigate(['/main/home/qr-scan'], { transition: { name: 'fade', duration: 350, curve: AnimationCurve.easeOut } });
            this.isQrScan = true;
            this.isQrPay = false;
        }
    }
    // start QR Pay
    navigateQrPay(event) {
        console.log("navigateQrPay HomeComponent");
        if (this.isQrPay == false) {
            
            let img = this.menubtn.nativeElement as Image;
            let menu = this.menu.nativeElement as LayoutBase;
            let p = screen.mainScreen.heightDIPs / screen.mainScreen.heightPixels;
            
            if(this.isMenuExt === true){
                // fold
                img.src = "~/images/btn_up.png"
                console.log("height = " + menu.getMeasuredHeight());
                menu.animate({
                    height: 374 * p,
                    duration:250,
                    curve: AnimationCurve.easeOut
                }).then(()=>{
                    console.log("end height = " + menu.getMeasuredHeight());
                    this.isMenuExt = !this.isMenuExt;
                });
            }
            this.routerExtensions.navigate(['/main/home/qr-pay'], { transition: { name: 'fade', duration: 350, curve: AnimationCurve.easeOut } });
            this.isQrScan = false;
            this.isQrPay = true;
        }

    }
    // show Transaction embedded view
    navigateTrEmb(event) {
        console.log("navigateTrEmb HomeComponent");
        if (this.isQrPay == true) {
            this.routerExtensions.navigate(['/main/home/tr-embedded'], { transition: { name: 'fade', duration: 350, curve: AnimationCurve.easeOut } });
            this.isQrPay = false;
        }
        if (this.isQrScan == true) {
            this.routerExtensions.navigate(['/main/home/tr-embedded'], { transition: { name: 'fade', duration: 350, curve: AnimationCurve.easeOut } });
            this.isQrScan = false;
        }
    }

    // translate octopus view to bottom of screen
    onLoadOctopus(event) {
        console.log("onLoadOctopus HomeComponent");
        let lbc = this.octopuscard.nativeElement as LayoutBase;
        let lb = this.octopus.nativeElement as LayoutBase;
        console.log(screen.mainScreen.heightDIPs);
        console.log(screen.mainScreen.heightPixels);
        lbc.translateY = screen.mainScreen.heightDIPs - 156;
    }

    onPan(event) {
        // console.log("onDragCard HomeComponent");
        let lbc = this.octopuscard.nativeElement as LayoutBase;
        let lb = this.octopus.nativeElement as LayoutBase;
        if (event.state === 1) // down
        {
            this.octopus_card_loc.originX = lbc.translateX;
            this.octopus_card_loc.originY = lbc.translateY;
            this.octopus_card_loc.prevDeltaY = 0;
        }
        else if (event.state === 2) // panning
        {
            lbc.translateY += event.deltaY - this.octopus_card_loc.prevDeltaY;

            this.octopus_card_loc.prevDeltaY = event.deltaY;

            lb.opacity = (1 - (lbc.translateY / screen.mainScreen.heightDIPs)) / 2;
            if(lb.opacity > 1){
                lb.opacity = 1;
            }else if(lb.opacity < 0){
                lb.opacity = 0;
            }
        }
        else if (event.state === 3) // up
        {
            console.log("lbc.translateY  => " + lbc.translateY);
            console.log("event.deltaY  => " + event.deltaY);
            if(lbc.translateY < (screen.mainScreen.heightDIPs / 2) ){
                // goto octopus page
                lbc.animate({
                    translate:{x:this.octopus_card_loc.originX, y: 35},
                    duration: 100,
                    curve: AnimationCurve.easeOut
                }).then(()=>{
                    lbc.animate({
                        translate:{x:this.octopus_card_loc.originX, y: 20},
                        duration: 80,
                        curve: AnimationCurve.easeOut
                    }).then(()=>{
                        this.routerExtensions.navigate(['/main/octopus'], { clearHistory: true, transition: { name: 'fade', duration: 350, curve: AnimationCurve.easeOut } });
                    });
                });
            }else{
                // goto origin location
                lbc.animate({
                    translate:{x:this.octopus_card_loc.originX, y:this.octopus_card_loc.originY},
                    duration:350,
                    curve: AnimationCurve.easeOut
                });
                lb.animate({
                    opacity: 0,
                    duration:350,
                    curve: AnimationCurve.easeOut
                });
                lbc.translateX = this.octopus_card_loc.originX;
                lbc.translateY= this.octopus_card_loc.originY;
            }
        }
    }

    // translate octopus card to top of the screen and
    // navigate to octopus
    navigateOctopus(event) {
        console.log("navigateOctopus HomeComponent");

        let lbc = this.octopuscard.nativeElement as LayoutBase;
        let lb = this.octopus.nativeElement as LayoutBase;
        console.log(lbc.getLocationInWindow());
        console.log(lbc.getLocationOnScreen());
        console.log(lbc.getLocationRelativeTo(lbc.parentNode.viewController));
        lb.animate({
            opacity:0.5,
            duration: 350,
            curve: AnimationCurve.easeOut
        });
        lbc.animate({
            translate: { x: lbc.translateX, y: 0 },
            duration: 350,
            curve: AnimationCurve.easeOut
        }).then(() => {
            lbc.animate({
                translate:{x:lbc.translateX, y: 30},
                duration:100,
                curve: AnimationCurve.easeOut
            }).then(()=>{
                lbc.animate({
                    translate:{x:lbc.translateX, y: 15},
                    duration:80,
                    curve: AnimationCurve.easeOut
                }).then(()=>{
                    this.routerExtensions.navigate(['/main/octopus'], { clearHistory: true, transition: { name: 'fade', duration: 350, curve: AnimationCurve.easeOut } });
                });
            });
        });
    }
}
