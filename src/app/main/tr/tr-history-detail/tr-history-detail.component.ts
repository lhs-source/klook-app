import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { AnimationCurve } from "@nativescript/core/ui/enums";

@Component({
    selector: "tr-history-detail",
    templateUrl: "./tr-history-detail.component.html",
    styleUrls:["./tr-history-detail.component.scss"]
})
export class TrHistoryDetailComponent implements OnInit {
    constructor(private routerExtensions : RouterExtensions) {
        console.log("constructor TrHistoryDetailComponent");
    }

    ngOnInit(): void {
        console.log("ngOnInit TrHistoryDetailComponent");
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
