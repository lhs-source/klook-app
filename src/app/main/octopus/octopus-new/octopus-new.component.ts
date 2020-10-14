import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";

import { AnimationCurve } from "@nativescript/core/ui/enums";
import { RouterExtensions } from "@nativescript/angular";
import { LayoutBase, ScrollEventData, ScrollView, Image, Label, ViewBase } from "tns-core-modules";
import { screen } from "tns-core-modules/platform/platform"
import { CustomTransitionBack } from "../../home/klook-transition";

@Component({
    selector: "octopus-new",
    templateUrl: "./octopus-new.component.html",
    styleUrls:["./octopus-new.component.scss"]
})
export class OctopusNewComponent implements OnInit {
    tag = this.constructor.name;
    
    cardlist = [
        "~/images/card_ezlink.png",
        "~/images/card_octopus.png",
        "~/images/card_oyster.png",
        "~/images/card_ezlink.png",
    ];

    // actionbar emit click close
    actionbar_click_close(isclose){
        console.log(this.tag + " actionbar close button clicked = " + isclose);

        this.routerExtensions.navigate(['/main/home'], { clearHistory:true, transition: { instance : new CustomTransitionBack(250, AnimationCurve.easeOut) } });
    }

    constructor(private routerExtensions : RouterExtensions) {
        console.log(`${this.tag} constructor `)
    }

    ngOnInit(): void {
        console.log(`${this.tag} ngOnInit`);
        console.log(this.routerExtensions.router.url);
    }
    
    
    ngAfterViewInit():void{
        console.log(this.tag + " ngAfterViewInit");
    }

    onTapCard(index){
        console.log(this.tag + " onTapCard = " + index);
    }

    onTabIssue(event){
        console.log(this.tag + " onTabIssue");
        this.routerExtensions.navigate(['/main/octopus/main'], { transition: { instance : new CustomTransitionBack(250, AnimationCurve.easeOut) } });
    }

    navigateBack(event) {
        console.log(this.tag + " navigateChargePoint");
        if(this.routerExtensions.canGoBack()){
            this.routerExtensions.back();
        }else{
            this.routerExtensions.navigate(['/main/octopus/main'], { transition: { instance : new CustomTransitionBack(250, AnimationCurve.easeOut) } });
        }
    }
}
