import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { AnimationCurve } from "@nativescript/core/ui/enums";

@Component({
    selector: "account",
    templateUrl: "./account.component.html",
    styleUrls:["./account.component.scss"]
})
export class AccountComponent implements OnInit {
    constructor(private routerExtensions : RouterExtensions) {
        console.log("constructor AccountComponent");
    }

    ngOnInit(): void {
        console.log("ngOnInit AccountComponent");
        console.log(this.routerExtensions.router.url);
    }
    navigateLink(event) {
        console.log("navigateChargePoint OctopusMainComponent");
        this.routerExtensions.navigate(['/main/account/link'], { transition: { name: 'slide', duration: 350, curve: AnimationCurve.easeOut } });

    }
    
    navigatePassport(event) {
        console.log("navigateChargePoint OctopusMainComponent");
        this.routerExtensions.navigate(['/main/account/passport'], { transition: { name: 'slide', duration: 350, curve: AnimationCurve.easeOut } });

    }
}
