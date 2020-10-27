import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { isAndroid, Application, AndroidApplication, AndroidActivityBackPressedEventData } from "tns-core-modules";
import { AnimationCurve } from "@nativescript/core/ui/enums";

import { CustomTransitionBack } from "../../../util/klook-transition";
import { HomeRoutingService } from "../home-routing.service";
import { PaymentService } from "../../../service/payment.service";
import { QrData } from "../../../service/qr-data.model";

@Component({
    selector: "qr-pay",
    templateUrl: "./qr-pay.component.html",
    styleUrls: ["./qr-pay.component.scss"]
})
export class QrPayComponent implements OnInit {
    tag = this.constructor.name;
    @Output() routing: EventEmitter<any> = new EventEmitter();

    timer = Date.now();
    // 3 mins
    secounds = 180;
    interval;


    pay_info : QrData = {
        merchant:"Central Department Store (Central Hat Yai)",
        amount:-419,
        country:"태국",
        description: "포인트사용",
        taxfree: false,
        utu: true,
    }

    constructor(private routerExtensions: RouterExtensions, 
        private routingService: HomeRoutingService,
        private paymentService: PaymentService) {
        console.log(`${this.tag} constructor `)

        if (isAndroid) { }
    }

    ngOnInit(): void {
        console.log(`${this.tag} ngOnInit`);
        console.log(this.routerExtensions.router.url);

        this.paymentService.storePayData(this.pay_info);

        this.interval = setInterval(() => {
            if (this.secounds > 0) {
                this.secounds--;
                // console.log("this.secounds");
            } else {
                this.secounds = 60;
            }
        }, 1000);
    }

    resetTimer() {
        clearInterval(this.interval);
        this.secounds = 180;
        this.interval = setInterval(() => {
            if (this.secounds > 0) {
                this.secounds--;
                // console.log("this.secounds");
            } else {
                this.secounds = 60;
            }
        }, 1000);
    }

    onTapInfo() {
        console.log(this.tag, " onTapInfo ", this.routing);
        this.routing.emit('pay');

        this.routingService.emitChange('pay');
        this.routerExtensions.navigate(['/main/home/pay'], {
            transition: { name: 'fade', duration: 250, curve: AnimationCurve.easeOut }
        });
    }
}
