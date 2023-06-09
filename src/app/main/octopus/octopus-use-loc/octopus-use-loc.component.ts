import { Component, OnInit } from "@angular/core";

import { AnimationCurve } from "@nativescript/core/ui/enums";
import { RouterExtensions } from "@nativescript/angular";
import { CustomTransitionBack } from "../../../util/klook-transition";

@Component({
    selector: "octopus-use-loc",
    templateUrl: "./octopus-use-loc.component.html",
    styleUrls:["./octopus-use-loc.component.scss"]
})
export class OctopusUseLocComponent implements OnInit {
    tag = this.constructor.name;
    constructor(private routerExtensions : RouterExtensions) {
        console.log(`${this.tag} constructor `)
    }

    ngOnInit(): void {
        console.log(`${this.tag} ngOnInit`);
        console.log(this.routerExtensions.router.url);
    }
    
    // actionbar emit click close
    actionbar_click_close(isclose) {
        console.log(this.tag + " actionbar close button clicked = " + isclose);

        this.routerExtensions.navigate(['/main/home'], { clearHistory:true, transition: { instance : new CustomTransitionBack(250, AnimationCurve.linear) } });
    }
    
    navigateBack(event) {
        console.log(this.tag + " OctopusMainComponent");
        if(this.routerExtensions.canGoBack()){
            this.routerExtensions.back();
        }else{
            this.routerExtensions.navigate(['/main/octopus/main'], { transition: { instance : new CustomTransitionBack(250, AnimationCurve.linear) } });
        }
    }
}
