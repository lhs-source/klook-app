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

@Component({
    selector: "pay",
    templateUrl: "./pay.component.html",
    styleUrls: ["./pay.component.scss"]
})
export class PayComponent implements OnInit {
    tag = this.constructor.name;
    
    // payment info from qr
    pay_info = {
        type:"식당",
        merchant:"Central Department Store (Central Hat Yai)",
        amount:419,
        point:15500,
        description: "포인트사용",
        taxfree: false,
        utu: true,
    }
    currency = "THB";

    constructor(private routerExtensions: RouterExtensions, 
        private route: ActivatedRoute,
        private elRef : ElementRef, 
        private routingService:HomeRoutingService, 
        private dataService : DataService,
        private paymentService : PaymentService) {
        console.log(`${this.tag} constructor `)

        this.pay_info = this.paymentService.pay_info;
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
        }
        this.paymentService.goPay().subscribe(
            res=>{ 
                console.log(this.tag, "goPay response");

                let status = res["response"]["status"];
                
                if(status === "ACCP"){
                    // add the tr to transaction list
                    this.dataService.addTr({
                        icon: this.pay_info.type,
                        merchant: this.pay_info.merchant,
                        point: this.pay_info.point,
                        curr: this.pay_info.amount,
                        date: new Date(), //(2020, 10, 12, 18, 20, 0, 0),
                        description: this.pay_info.description,
                        taxfree: this.pay_info.taxfree,
                        utu: this.pay_info.utu,
                        save_point: this.pay_info.point * 0.1,
                    });
                    this.dataService.decreasePoint(this.pay_info.point);
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
