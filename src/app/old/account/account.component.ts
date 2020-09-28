import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from "@angular/core";
import { Application, EventData } from "@nativescript/core";
import { LayoutBase } from "@nativescript/core/ui";
import { CubicBezierAnimationCurve } from "@nativescript/core/ui/animation";

// android
import { AndroidApplication, AndroidActivityBackPressedEventData } from "tns-core-modules/application";
import { isAndroid } from "tns-core-modules/platform";

@Component({
    selector: "Account",
    templateUrl: "./account.component.html",
    styleUrls:["./account.component.scss"]
})
export class AccountComponent implements OnInit {
    @Output() modal_click : EventEmitter<boolean> = new EventEmitter();
    @ViewChild('rootlayout') rootlayout : ElementRef;

    modal_show = false;

    constructor() {
        // Use the component constructor to inject providers.
        console.log("constructor AccountComponent");
    }

    ngOnInit(): void {
        // Init your component properties here.
        console.log("ngOnInit AccountComponent");

        if (isAndroid) {
            Application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
                console.log("back button pressed on AccountComponent");
            });
        }
    }

    onLoadLayout(){
        console.log("onLoadLayout AccountComponent");
        if(this.modal_show === false){
            // not show
            let navl = this.rootlayout.nativeElement as LayoutBase;
            console.log(navl)
            
            // console.log("navl " + navl.getMeasuredWidth());
            // console.log("navl " + navl.width);
            // console.log("navl " + navl.effectiveWidth);

            navl.translateX = -2000;
        }else{

        }
    }
    // called from outside
    toggle(){
        let navl = this.rootlayout.nativeElement as LayoutBase;

        let x = -navl.getMeasuredWidth();

        // console.log(navl);
        // console.log(x);
        // console.log(this.modal_show);
        // console.log(navl.translateX);
        // console.log(x);
        if(this.modal_show === false){
            // will show
            navl.animate({
                translate:{x:0, y:0},
                duration: 650,
                curve: new CubicBezierAnimationCurve(0.6, 0.72, 0, 1),
            }).then(()=>{ this.modal_show = true; });
        }else{
            // will close
            navl.animate({
                translate:{x:x, y:0},
                duration: 650,
                curve: new CubicBezierAnimationCurve(.42,0,.58,1),
            }).then(()=>{ this.modal_show = false });
        }
    }

    onTabAccount(event: EventData){
        this.toggle();
        this.modal_click.emit(this.modal_show);
    }

}
