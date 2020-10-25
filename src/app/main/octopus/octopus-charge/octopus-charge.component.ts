import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";

import { AnimationCurve } from "@nativescript/core/ui/enums";
import { RouterExtensions } from "@nativescript/angular";
import { LayoutBase, ScrollEventData, ScrollView, Image, Label, ViewBase, GridLayout, GridUnitType } from "tns-core-modules";
import { screen } from "tns-core-modules/platform/platform"
import { ActivatedRoute } from "@angular/router";
import { ItemSpec } from "tns-core-modules/ui/layouts/grid-layout";
import { CustomTransitionBack } from "../../../util/klook-transition";
import { DataService } from "../../../service/data.service";
import { CountryService } from "../../../service/country.service";

@Component({
    selector: "octopus-charge",
    templateUrl: "./octopus-charge.component.html",
    styleUrls:["./octopus-charge.component.scss"]
})
export class OctopusChargeComponent implements OnInit {
    tag = this.constructor.name;

    @ViewChild('cardframe', {static:true}) cardframe : ElementRef;
    @ViewChild('cardelems', {static:true}) cardelems : ElementRef;

    card_index = 0;

    constructor(private routerExtensions : RouterExtensions, private activatedRoute : ActivatedRoute,
        private dataService: DataService,
        private countryService: CountryService,) {
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

    // actionbar emit click close
    actionbar_click_close(isclose){
        console.log(this.tag + " actionbar close button clicked = " + isclose);
        this.routerExtensions.navigate(['/main/home'], { clearHistory:true, transition: { instance : new CustomTransitionBack(250, AnimationCurve.linear) } });
    }
    onLoadedCardImage(event){
        let p = screen.mainScreen.heightDIPs / screen.mainScreen.heightPixels;
        setTimeout(() => {
            let img = this.cardframe.nativeElement as Image;
            let lb = this.cardelems.nativeElement as GridLayout;

            let img_height = img.getMeasuredHeight() * p;
            let top_bottom_height = 60;
            let shadow_margin = 46;


            console.log(img.getMeasuredHeight() * p);
            console.log(lb);
            let parent = img.parentNode;
            lb.removeRows();
            lb.addRow(new ItemSpec(top_bottom_height, GridUnitType.PIXEL));
            lb.addRow(new ItemSpec((img_height - top_bottom_height * 2 - shadow_margin), GridUnitType.PIXEL));
            lb.addRow(new ItemSpec(top_bottom_height, GridUnitType.PIXEL));            
        });
    }
    
    ngAfterViewInit():void{
        console.log(this.tag + " ngAfterViewInit");
    }

    onTabCharge(event){
        console.log("emit the button");
        this.routerExtensions.navigate(['/main/octopus/main'], { transition: { instance : new CustomTransitionBack(250, AnimationCurve.linear) } });
    }

    navigateBack(event) {
        console.log(this.tag + " navigateChargePoint");
        
        this.routerExtensions.navigate(['/main/octopus/main'], { transition: { instance : new CustomTransitionBack(250, AnimationCurve.linear) } });
        
    }
}
