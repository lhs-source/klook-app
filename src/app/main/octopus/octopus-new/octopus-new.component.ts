import { Component, OnInit } from "@angular/core";

import { AnimationCurve } from "@nativescript/core/ui/enums";
import { RouterExtensions } from "@nativescript/angular";

@Component({
    selector: "octopus-new",
    templateUrl: "./octopus-new.component.html",
    styleUrls:["./octopus-new.component.scss"]
})
export class OctopusNewComponent implements OnInit {
    constructor(private routerExtensions : RouterExtensions) {
        console.log("constructor OctopusNewComponent");
    }

    ngOnInit(): void {
        console.log("ngOnInit OctopusNewComponent");
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
