import { Component, OnInit } from "@angular/core";

import { AnimationCurve } from "@nativescript/core/ui/enums";
import { RouterExtensions } from "@nativescript/angular";

@Component({
    selector: "octopus-use-loc",
    templateUrl: "./octopus-use-loc.component.html",
    styleUrls:["./octopus-use-loc.component.scss"]
})
export class OctopusUseLocComponent implements OnInit {
    constructor(private routerExtensions : RouterExtensions) {
        console.log("constructor OctopusUseLocComponent");
    }

    ngOnInit(): void {
        console.log("ngOnInit OctopusUseLocComponent");
        console.log(this.routerExtensions.router.url);
    }
    
    navigateBack(event) {
        console.log("navigateChargePoint OctopusMainComponent");
        if(this.routerExtensions.canGoBack()){
            this.routerExtensions.back();
        }else{
            this.routerExtensions.navigate(['/main/octopus/main'], { transition: { name: 'fade', duration: 350, curve: AnimationCurve.easeOut } });
        }
    }
}
