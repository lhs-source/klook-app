import { Component, OnInit } from "@angular/core";

import { RouterExtensions } from "@nativescript/angular";
import { AnimationCurve } from "@nativescript/core/ui/enums";
import { CustomTransitionBack } from "../../util/klook-transition";

@Component({
    selector: "UserAuth",
    templateUrl: "./userauth.component.html",
    styleUrls:["./userauth.component.scss"]
})
export class UserAuthComponent implements OnInit {
    tag = this.constructor.name;
    constructor(private routerExtensions : RouterExtensions) {
        console.log(`${this.tag} constructor `)
    }

    ngOnInit(): void {
        console.log(`${this.tag} ngOnInit`);
        console.log(this.routerExtensions.router.url);
    }
    
    onTapPhone(event){
        console.log(this.tag, "onTapPhone");
        this.routerExtensions.navigate(['/initial-auth/pin-new'], {transition : {name:'slide', duration:250, curve: AnimationCurve.easeOut}});
    }

    onTapCert(event){
        console.log(this.tag, "onTapCert");
        this.routerExtensions.navigate(['/initial-auth/pin-new'], {transition : {name:'slide', duration:250, curve: AnimationCurve.easeOut}});
    }
    
    // actionbar emit click close
    actionbar_click_close(isclose){
        console.log(this.tag + " actionbar close button clicked = " + isclose);
        this.routerExtensions.navigate(['/initial-auth/klook-main'], { 
            clearHistory:true, 
            transition: { instance : new CustomTransitionBack(250, AnimationCurve.linear) } 
        });
    }
}
