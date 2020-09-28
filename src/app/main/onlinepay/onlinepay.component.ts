import { Component, OnInit } from "@angular/core";
import { AnimationCurve } from "@nativescript/core/ui/enums";
import { RouterExtensions } from "@nativescript/angular";

@Component({
    selector: "onlinepay",
    templateUrl: "./onlinepay.component.html",
    styleUrls:["./onlinepay.component.scss"]
})
export class OnlinepayComponent implements OnInit {
    constructor(private routerExtensions : RouterExtensions) {
        console.log("constructor OnlinepayComponent");
    }

    ngOnInit(): void {
        console.log("ngOnInit OnlinepayComponent");
    }
    navigateBack(event) {
        console.log("navigateChargePoint OnlinepayComponent");
        if(this.routerExtensions.canGoBack()){
            this.routerExtensions.back();
        }else{
            this.routerExtensions.navigate(['/main/home'], { transition: { name: 'fade', duration: 350, curve: AnimationCurve.easeOut } });
        }
    }
}
