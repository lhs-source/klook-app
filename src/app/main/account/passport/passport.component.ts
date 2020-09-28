import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { AnimationCurve } from "@nativescript/core/ui/enums";

@Component({
    selector: "passport",
    templateUrl: "./passport.component.html",
    styleUrls:["./passport.component.scss"]
})
export class PassportComponent implements OnInit {
    constructor(private routerExtensions: RouterExtensions) {
        console.log("constructor PassportComponent");
    }

    ngOnInit(): void {
        console.log("ngOnInit PassportComponent");
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
