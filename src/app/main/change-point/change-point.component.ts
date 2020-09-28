import { Component, OnInit } from "@angular/core";
import { AnimationCurve } from "@nativescript/core/ui/enums";
import { RouterExtensions } from "@nativescript/angular";

@Component({
    selector: "change-point",
    templateUrl: "./change-point.component.html",
    styleUrls:["./change-point.component.scss"]
})
export class ChangePointComponent implements OnInit {
    constructor(private routerExtensions : RouterExtensions) {
        console.log("constructor ChangePointComponent");
    }

    ngOnInit(): void {
        console.log("ngOnInit ChangePointComponent");
    }
    navigateBack(event) {
        console.log("navigateChargePoint ChangePointComponent");
        if(this.routerExtensions.canGoBack()){
            this.routerExtensions.back();
        }else{
            this.routerExtensions.navigate(['/main/home'], { transition: { name: 'fade', duration: 350, curve: AnimationCurve.easeOut } });
        }
    }
}
