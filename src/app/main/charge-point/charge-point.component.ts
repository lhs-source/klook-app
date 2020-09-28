import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { AnimationCurve } from "@nativescript/core/ui/enums";

@Component({
    selector: "charge-point",
    templateUrl: "./charge-point.component.html",
    styleUrls:["./charge-point.component.scss"]
})
export class ChargePointComponent implements OnInit {
    constructor(private routerExtensions : RouterExtensions) {
        console.log("constructor ChargePointComponent");
    }

    ngOnInit(): void {
        console.log("ngOnInit ChargePointComponent");
    }
    navigateBack(event) {
        console.log("navigateChargePoint ChargePointComponent");
        if(this.routerExtensions.canGoBack()){
            this.routerExtensions.back();
        }else{
            this.routerExtensions.navigate(['/main/home'], { transition: { name: 'fade', duration: 350, curve: AnimationCurve.easeOut } });
        }
    }
}
