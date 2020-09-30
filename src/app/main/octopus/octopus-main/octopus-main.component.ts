import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";

import { AnimationCurve } from "@nativescript/core/ui/enums";
import { isAndroid, Application, AndroidApplication, AndroidActivityBackPressedEventData } from "tns-core-modules";

@Component({
    selector: "octopus-main",
    templateUrl: "./octopus-main.component.html",
    styleUrls:["./octopus-main.component.scss"]
})
export class OctopusMainComponent implements OnInit {
    constructor(private routerExtensions : RouterExtensions) {
        console.log("constructor OctopusMainComponent");

        if (isAndroid) {
            Application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
                console.log("back button pressed on OctopusMainComponent");
                data.cancel = true;
                this.routerExtensions.navigate(['/main/home'], {clearHistory : true});
            });
        }
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
