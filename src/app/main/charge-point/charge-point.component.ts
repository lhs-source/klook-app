import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { AnimationCurve } from "@nativescript/core/ui/enums";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "charge-point",
    templateUrl: "./charge-point.component.html",
    styleUrls:["./charge-point.component.scss"]
})
export class ChargePointComponent implements OnInit {
    constructor(private routerExtensions : RouterExtensions, private activatedRoute : ActivatedRoute) {
        console.log("constructor ChargePointComponent");
    }

    ngOnInit(): void {
        console.log("ngOnInit ChargePointComponent");
        console.log(this.routerExtensions.router.url);
    }
    navigateBack(event) {
        console.log("navigateChargePoint ChargePointComponent");
        if(this.routerExtensions.canGoBack()){
            this.routerExtensions.back({relativeTo: this.activatedRoute});
        }else{
            this.routerExtensions.navigate(['/main/home'], { transition: { name: 'fade', duration: 350, curve: AnimationCurve.easeOut }, clearHistory : true });
        }
    }
}
