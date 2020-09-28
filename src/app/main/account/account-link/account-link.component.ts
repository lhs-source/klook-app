import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { AnimationCurve } from "@nativescript/core/ui/enums";

@Component({
    selector: "account-link",
    templateUrl: "./account-link.component.html",
    styleUrls:["./account-link.component.scss"]
})
export class AccountLinkComponent implements OnInit {
    constructor(private routerExtensions: RouterExtensions) {
        console.log("constructor AccountLinkComponent");
    }

    ngOnInit(): void {
        console.log("ngOnInit AccountLinkComponent");
        console.log(this.routerExtensions.router.url);
    }
    navigateBack(event) {
        console.log("navigateChargePoint OctopusMainComponent");
        if(this.routerExtensions.canGoBack()){
            this.routerExtensions.back();
        }else{
            this.routerExtensions.navigate(['/main/account/list'], { transition: { name: 'fade', duration: 350, curve: AnimationCurve.easeOut } });
        }
    }
}
