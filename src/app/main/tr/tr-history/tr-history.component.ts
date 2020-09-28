import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { AnimationCurve } from "@nativescript/core/ui/enums";

@Component({
    selector: "tr-history",
    templateUrl: "./tr-history.component.html",
    styleUrls:["./tr-history.component.scss"]
})
export class TrHistoryComponent implements OnInit {
    constructor(private routerExtensions : RouterExtensions) {
        console.log("constructor TrHistoryComponent");
    }

    ngOnInit(): void {
        console.log("ngOnInit TrHistoryComponent");
        console.log(this.routerExtensions.router.url);
    }
    
    navigateDetails(event) {
        console.log("navigateChargePoint TrHistoryComponent");
        this.routerExtensions.navigate(['/main/tr/detail'], { transition: { name: 'slide', duration: 350, curve: AnimationCurve.easeOut } });

    }
}
