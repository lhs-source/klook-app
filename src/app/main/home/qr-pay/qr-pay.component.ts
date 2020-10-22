import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { isAndroid, Application, AndroidApplication, AndroidActivityBackPressedEventData } from "tns-core-modules";
import { AnimationCurve } from "@nativescript/core/ui/enums";

import { CustomTransitionBack } from "../../../util/klook-transition";
import { HomeRoutingService } from "../home-routing.service";
import { PaymentService } from "../../../service/payment.service";

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

    constructor(private routerExtensions: RouterExtensions, 
        private routingService: HomeRoutingService,
        private paymentService: PaymentService) {
        console.log(`${this.tag} constructor `)

        if (isAndroid) { }
    }

    ngOnInit(): void {
        console.log(`${this.tag} ngOnInit`);
        console.log(this.routerExtensions.router.url);

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
            transition: { instance: new CustomTransitionBack(250, AnimationCurve.linear) }
        });
    }
}
