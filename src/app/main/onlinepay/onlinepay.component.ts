import { Component, OnInit } from "@angular/core";
import { AnimationCurve } from "@nativescript/core/ui/enums";
import { RouterExtensions } from "@nativescript/angular";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "onlinepay",
    templateUrl: "./onlinepay.component.html",
    styleUrls:["./onlinepay.component.scss"]
})
export class OnlinepayComponent implements OnInit {
    constructor(private routerExtensions : RouterExtensions, private activatedRoute : ActivatedRoute) {
        console.log("constructor OnlinepayComponent");
    }

    ngOnInit(): void {
        console.log("ngOnInit OnlinepayComponent");
        console.log(this.routerExtensions.router.url);
    }
    navigateBack(event) {
        console.log("navigateChargePoint OnlinepayComponent");
        if(this.routerExtensions.canGoBack()){
            this.routerExtensions.back({relativeTo: this.activatedRoute});
        }else{
            this.routerExtensions.navigate(['/main/home'], { transition: { name: 'fade', duration: 350, curve: AnimationCurve.easeOut }, clearHistory : true });
        }
    }
}
