import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";

import { AnimationCurve } from "@nativescript/core/ui/enums";
import { RouterExtensions } from "@nativescript/angular";
import { LayoutBase, ScrollEventData, ScrollView, Image, Label, ViewBase } from "tns-core-modules";
import { screen } from "tns-core-modules/platform/platform"
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "octopus-charge",
    templateUrl: "./octopus-charge.component.html",
    styleUrls:["./octopus-charge.component.scss"]
})
export class OctopusChargeComponent implements OnInit {
    tag = this.constructor.name;

    card_index = 0;

    // actionbar emit click close
    actionbar_click_close(isclose){
        console.log(this.tag + " actionbar close button clicked = " + isclose);
        this.routerExtensions.navigate(['/main/home'], { transition: { name: 'fade', duration: 250, curve: AnimationCurve.easeOut } });
    }

    constructor(private routerExtensions : RouterExtensions, private activatedRoute : ActivatedRoute) {
        console.log(`${this.tag} constructor `)
    }

    ngOnInit(): void {
        console.log(`${this.tag} ngOnInit`);
        console.log(this.routerExtensions.router.url);
        console.log(this.activatedRoute.params.subscribe(params=> {
            this.card_index = params['index'];
            console.log("index = " + this.card_index);
        }));

    }
    
    ngAfterViewInit():void{
        console.log(this.tag + " ngAfterViewInit");
    }

    navigateBack(event) {
        console.log(this.tag + " navigateChargePoint");
        if(this.routerExtensions.canGoBack()){
            this.routerExtensions.back();
        }else{
            this.routerExtensions.navigate(['/main/octopus/main'], { transition: { name: 'fade', duration: 350, curve: AnimationCurve.easeOut } });
        }
    }
}
