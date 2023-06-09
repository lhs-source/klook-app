import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { AnimationCurve } from "@nativescript/core/ui/enums";
import { AuthService } from "../../../service/auth.service";
import { DataService } from "../../../service/data.service";
import { CustomTransition, CustomTransitionBack } from "../../../util/klook-transition";

import { alert } from "tns-core-modules/ui/dialogs";
import { MerchantService } from "../../../service/merchant.service";
import { CountryService } from "../../../service/country.service";
import { TransactionService } from "../../../service/transaction.service";
import { OctopusService } from "../../../service/octopus.service";
import { ProgressService } from "../../../components/progress/progress.service";

@Component({
    selector: "account-link",
    templateUrl: "./account-link.component.html",
    styleUrls:["./account-link.component.scss"]
})
export class AccountLinkComponent implements OnInit {
    tag = this.constructor.name;
    constructor(private routerExtensions: RouterExtensions,
        private dataService : DataService,
        private merchantService : MerchantService,
        private countryService : CountryService,
        private transactionService : TransactionService,
        private authService : AuthService,
        private octopusService : OctopusService,
        private progressService : ProgressService,
        private viewContainerRef : ViewContainerRef) {
        console.log(`${this.tag} constructor `)
    }

    ngOnInit(): void {
        console.log(`${this.tag} ngOnInit`);
        console.log(this.routerExtensions.router.url);
    }

    // actionbar emit click close
    actionbar_click_close(isclose) {
        console.log(this.tag + " actionbar close button clicked = " + isclose);

        this.routerExtensions.navigate(['/main/home'], { clearHistory:true, transition: { instance : new CustomTransitionBack(250, AnimationCurve.linear) } });
    }
    
    onTapYes(event) {
        console.log(`${this.tag} onTapYes`);
        setTimeout(() => {
            this.progressService.progressOn(this.viewContainerRef);
        });    
        this.transactionService.reset().subscribe(
            res=>{
                console.log(res);
                
                this.authService.reset();
                this.dataService.reset();
                this.countryService.reset();
                this.octopusService.reset();

                this.progressService.progressOff();
                alert({
                    title: "계정연동 해제",
                    message: "계정연동을 해제하였습니다. 초기화면으로 돌아갑니다.",
                    okButtonText: "확인"
                }).then(()=>{
                    this.routerExtensions.navigate(['/initial-auth'], { 
                        clearHistory:true, 
                        transition: { instance : new CustomTransitionBack(250, AnimationCurve.linear) } 
                    });
                });
            },
            err=>{}
        )
        
    }
    onTapNo(event) {
        console.log(`${this.tag} onTapNo`);
        // this.routerExtensions.backToPreviousPage();
        // this.routerExtensions.navigate(['/main/home'], { clearHistory:true, transition: { instance : new CustomTransitionBack(250, AnimationCurve.linear) } });
        this.routerExtensions.back();
    }


    onTabDisconnect(event) {
        console.log(`${this.tag} navigateChargePoint`);
        if(this.routerExtensions.canGoBack()){
            this.routerExtensions.back();
        }else{
            this.routerExtensions.navigate(['/main/account/list'], { transition: { instance : new CustomTransition(250, AnimationCurve.linear) } });
        }
    }
}
