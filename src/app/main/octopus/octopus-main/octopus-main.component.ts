import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";

import { AnimationCurve } from "@nativescript/core/ui/enums";

@Component({
    selector: "octopus-main",
    templateUrl: "./octopus-main.component.html",
    styleUrls:["./octopus-main.component.scss"]
})
export class OctopusMainComponent implements OnInit {
    constructor(private routerExtensions : RouterExtensions) {
        console.log("constructor OctopusMainComponent");
    }

    ngOnInit(): void {
        console.log("ngOnInit OctopusMainComponent");
    }
    
    navigateNew(event) {
        console.log("navigateChargePoint OctopusMainComponent");
        this.routerExtensions.navigate(['/main/octopus/new'], { transition: { name: 'slide', duration: 350, curve: AnimationCurve.easeOut } });

    }
    
    navigateUseLoc(event) {
        console.log("navigateChargePoint OctopusMainComponent");
        this.routerExtensions.navigate(['/main/octopus/use-loc'], { transition: { name: 'slide', duration: 350, curve: AnimationCurve.easeOut } });

    }
}
