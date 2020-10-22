import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { isAndroid, Application, AndroidApplication, AndroidActivityBackPressedEventData } from "tns-core-modules";
import { AnimationCurve } from "@nativescript/core/ui/enums";

import { CustomTransitionBack } from "../klook-transition";
import { HomeRoutingService } from "../home-routing.service";
import { PaymentService } from "../../payment.service";

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

    constructor(private routerExtensions: RouterExtensions, private routingService: HomeRoutingService,
        private paymentService : PaymentService) {
        console.log(`${this.tag} constructor `)

        if (isAndroid) {
            // Application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
            //     console.log("back button pressed on " + this.tag);
            //     data.cancel = true;
            //     this.routerExtensions.navigate(['/main/home'], {clearHistory : true});
            // });
        }
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

        
        this.getToken()
    }
    
    getToken(){
        // this.paymentService.getToken().subscribe(
        //     (res)=>{
        //         console.log(this.tag, "success ", res);
        //         this.paymentService.getAccounts();
        //     },
        //     (err)=>{
        //         console.log(this.tag, "error ", err);
        //     },
        //     ()=>{},
        // )
        this.paymentService.getAccounts().subscribe(
            res=>{ 
                console.log(this.tag, "getAccounts response = ",res)
            },
            err=>{
                console.log(this.tag, "getAccounts error = ", err)
            });
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
