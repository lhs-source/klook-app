import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { isAndroid, Application, AndroidApplication, AndroidActivityBackPressedEventData, LayoutBase } from "tns-core-modules";
import { AnimationCurve } from "@nativescript/core/ui/enums";
import { DataService } from "../../../service/data.service";
import { CustomTransitionBack } from "../../../util/klook-transition";
import { HomeRoutingService } from "../home-routing.service";
import { PaymentService } from "../../../service/payment.service";
import { ActivatedRoute } from "@angular/router";
import * as Toast from 'nativescript-toast';
import { QrData } from "../../../service/qr-data.model";

@Component({
    selector: "pay",
    templateUrl: "./pay.component.html",
    styleUrls: ["./pay.component.scss"]
})
export class PayComponent implements OnInit {
    tag = this.constructor.name;
    
    // payment info from qr
    pay_info : QrData = {
        merchant:"Central Department Store (Central Hat Yai)",
        amount:419,
        description: "포인트사용",
        taxfree: false,
        utu: true,
    }
    point = 0;
    currency = "THB";

    constructor(private routerExtensions: RouterExtensions, 
        private route: ActivatedRoute,
        private elRef : ElementRef, 
        private routingService:HomeRoutingService, 
        private dataService : DataService,
        private paymentService : PaymentService) {
        console.log(`${this.tag} constructor `)

        this.pay_info = this.paymentService.pay_info;
        this.point = this.pay_info.amount * this.dataService.countries[this.dataService.country].exchange;
        this.currency = this.dataService.getCurrency();
        if (isAndroid) {
        }
    }

    ngOnInit(): void {
        console.log(`${this.tag} ngOnInit`);
        console.log(this.routerExtensions.router.url);
    }

    onTapNo(event){
        this.routerExtensions.navigate(['/main/home/tr-embedded'], { clearHistory:true, transition: {
            name: 'fade',
            duration: 250,
            curve: AnimationCurve.easeOut
        } });
    }
    onTapYes(event){
        if(this.dataService.point < this.pay_info.amount){
            Toast.makeText("The amount is larger than my balance").show();
            return;
        }
        this.paymentService.goPay().subscribe(
            res=>{ 
                console.log(this.tag, "goPay response");

                let status = res["response"]["status"];
                
                if(status === "ACCP"){
                    // add the tr to transaction list
                    let point = this.pay_info.amount * this.dataService.countries[this.dataService.country].exchange;
                    this.dataService.addTrFromQr(this.pay_info);
                    this.dataService.decreasePoint(point);
                }else{
                    // not approved
                    console.log(this.tag, "goPay response = ", res["response"])
                    // let reason = res["response"]["reason"];
                    // let authorizationCode = res["authorizationCode"];
                    // let transactionId = res["transactionId"];
                    // console.log("status =",status);
                    // console.log("reason =",reason);
                    // console.log("authorizationCode =",authorizationCode);
                    // console.log("transactionId =",transactionId);
                }
            },
            err=>{
                console.log(this.tag, "goPay error = ", err)
            },
            ()=>{
                // complete and go tr page
                this.routingService.emitChange('tr');
                this.routerExtensions.navigate(['/main/home/tr-embedded'], { clearHistory:true, transition: {
                    name: 'fade',
                    duration: 250,
                    curve: AnimationCurve.easeOut
                } });
            });
    }
}
