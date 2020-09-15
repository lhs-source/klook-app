import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { EventData } from "tns-core-modules/ui/content-view";
import { NgLayoutBase } from "@nativescript/angular/view-util";
import { CubicBezierAnimationCurve } from "@nativescript/core/ui/animation";
import * as platformModule from "tns-core-modules/platform";

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
    styleUrls:["app.component.scss"]
})
export class AppComponent implements OnInit {
    @ViewChild('navLayout', {static : true}) navLayout : ElementRef;
    isNavShow = false;
    ngiftest = false;

    ngOnInit(): void {
        
        let navl = this.navLayout.nativeElement as NgLayoutBase;
        
        console.log("navl " + navl.getMeasuredWidth());
        console.log("navl " + navl.width);
        console.log("navl " + navl.effectiveWidth);
        navl.translateX = -2000;
        
        // navl.translateX = 100;
    }

    onTabAccount(event:EventData){
        // console.log("click account button");
        // console.log(event);

        let navl = this.navLayout.nativeElement as NgLayoutBase;

        let x = -navl.getMeasuredWidth();
        // console.log(x);
        if(this.isNavShow == false){
            // will show
            navl.animate({
                // scale:{x:1.1, y:1.1},
                translate:{x:0, y:0},
                duration: 650,
                curve: new CubicBezierAnimationCurve(0.6, 0.72, 0, 1),
            });
        }else{
            // will close
            navl.animate({
                // scale:{x:1.1, y:1.1},
                translate:{x:x, y:0},
                duration: 650,
                curve: new CubicBezierAnimationCurve(0.6, 0.72, 0, 1),
            });
        }
        this.isNavShow = !this.isNavShow;
        
    }
}
