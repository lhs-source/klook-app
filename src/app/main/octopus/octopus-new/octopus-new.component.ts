import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";

import { AnimationCurve } from "@nativescript/core/ui/enums";
import { RouterExtensions } from "@nativescript/angular";
import { LayoutBase, ScrollEventData, ScrollView, Image } from "tns-core-modules";
import { screen } from "tns-core-modules/platform/platform"

@Component({
    selector: "octopus-new",
    templateUrl: "./octopus-new.component.html",
    styleUrls:["./octopus-new.component.scss"]
})
export class OctopusNewComponent implements OnInit {
    tag = this.constructor.name;
    @ViewChild('scroll', {static:true}) scrollview : ElementRef;
    @ViewChild('scroll_items', {static:true}) scrollitems : ElementRef;
    cards=[];

    cardwidth = 200;
    margin = 24;

    constructor(private routerExtensions : RouterExtensions) {
        console.log(`${this.tag} constructor `)
    }

    ngOnInit(): void {
        console.log(`${this.tag} ngOnInit`);
        console.log(this.routerExtensions.router.url);
    }
    
    onScroll(args: ScrollEventData){
        const scrollView = args.object as ScrollView;
        

        let loc1 = this.cardwidth + this.margin * 2 + 
        1 * (this.cardwidth + this.margin * 2) 
        - this.cardwidth / 2 - this.margin - screen.mainScreen.widthDIPs / 2;
        let loc2 = this.cardwidth + this.margin * 2 + 
        2 * (this.cardwidth + this.margin * 2) 
        - this.cardwidth / 2 - this.margin - screen.mainScreen.widthDIPs / 2;
        let loc3 = this.cardwidth + this.margin * 2 + 
        3 * (this.cardwidth + this.margin * 2) 
        - this.cardwidth / 2 - this.margin - screen.mainScreen.widthDIPs / 2;

        console.log("scrollX: " + args.scrollX);

        if(args.eventName){

        }
    }
    
    scrolltest(num){
        let sv = this.scrollview.nativeElement as ScrollView;
        let si = this.scrollitems.nativeElement as LayoutBase;

        si.eachChild((view) => {
            let img = view as Image;
            console.log(img.getLocationOnScreen());
            console.log(img.getLocationInWindow());
            console.log(img.getLocationRelativeTo(si));
            return true;
        });
        
        console.log("offset1: " + sv.horizontalOffset);

        console.log(sv.scrollableWidth);
        console.log(screen.mainScreen.widthDIPs);
        sv.scrollToHorizontalOffset(
            this.cardwidth + this.margin * 2 + 
            num * (this.cardwidth + this.margin * 2) 
            - this.cardwidth / 2 - this.margin - screen.mainScreen.widthDIPs / 2, true);
    }

    navigateBack(event) {
        console.log(this.tag + " navigateChargePoint OctopusMainComponent");
        if(this.routerExtensions.canGoBack()){
            this.routerExtensions.back();
        }else{
            this.routerExtensions.navigate(['/main/octopus/main'], { transition: { name: 'fade', duration: 350, curve: AnimationCurve.easeOut } });
        }
    }
}
