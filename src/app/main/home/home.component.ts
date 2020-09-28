import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";

import { AnimationCurve } from "@nativescript/core/ui/enums";

@Component({
    selector: "home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
    constructor(private routerExtensions: RouterExtensions) {
        console.log("constructor HomeComponent");
    }

    ngOnInit(): void {
        console.log("ngOnInit HomeComponent");
        console.log(this.routerExtensions.router.url);
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
    navigateOctopus(event) {
        console.log("navigateOctopus HomeComponent");
        this.routerExtensions.navigate(['/main/octopus'], { transition: { name: 'slideTop', duration: 350, curve: AnimationCurve.easeOut } });
        // this.routerExtensions.navigate(['/main/octopus'], { transition: { name: 'curlUp', duration: 350, curve: AnimationCurve.easeOut } });

    }
    navigateTransaction(event) {
        console.log("navigateTransaction HomeComponent");
        this.routerExtensions.navigate(['/main/tr'], { transition: { name: 'fade', duration: 350, curve: AnimationCurve.easeOut } });

    }
    navigateAccount(event) {
        console.log("navigateAccount HomeComponent");
        this.routerExtensions.navigate(['/main/account'], { transition: { name: 'fade', duration: 350, curve: AnimationCurve.easeOut } });

    }

    
    navigateQrScan(event) {
        console.log("navigateQrScan HomeComponent");
        this.routerExtensions.navigate(['/main/home/qr-scan'], { transition: { name: 'fade', duration: 350, curve: AnimationCurve.easeOut } });

    }
    navigateQrPay(event) {
        console.log("navigateQrPay HomeComponent");
        this.routerExtensions.navigate(['/main/home/qr-pay'], { transition: { name: 'fade', duration: 350, curve: AnimationCurve.easeOut } });

    }
    navigateTrEmb(event) {
        console.log("navigateTrEmb HomeComponent");
        this.routerExtensions.navigate(['/main/home/tr-embedded'], { transition: { name: 'fade', duration: 350, curve: AnimationCurve.easeOut } });

    }
}
