import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { AnimationCurve } from "@nativescript/core/ui/enums";

@Component({
    selector: "tr-history-detail",
    templateUrl: "./tr-history-detail.component.html",
    styleUrls:["./tr-history-detail.component.scss"]
})
export class TrHistoryDetailComponent implements OnInit {
    tag = this.constructor.name;
    constructor(private routerExtensions : RouterExtensions) {
        console.log(`${this.tag} constructor `)
    }

    ngOnInit(): void {
        console.log(`${this.tag} ngOnInit`);
        console.log(this.routerExtensions.router.url);
    }
    navigateBack(event) {
        console.log(this.tag + " navigateChargePoint");
        if(this.routerExtensions.canGoBack()){
            this.routerExtensions.back();
        }else{
            this.routerExtensions.navigate(['/main/home'], { transition: { name: 'fade', duration: 250, curve: AnimationCurve.easeOut } });
        }
    }
}
