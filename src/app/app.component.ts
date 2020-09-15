import { Component, OnInit, ElementRef, ViewChild, ViewChildren } from "@angular/core";
import { Application, EventData } from "@nativescript/core";
import { NgLayoutBase } from "@nativescript/angular/view-util";
import { CubicBezierAnimationCurve } from "@nativescript/core/ui/animation";
import * as platformModule from "tns-core-modules/platform";
import { AccountComponent } from "./account/account.component";

// android
import { AndroidApplication, AndroidActivityBackPressedEventData } from "tns-core-modules/application";
import { isAndroid } from "tns-core-modules/platform";
import { RouterExtensions } from "@nativescript/angular";

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
    styleUrls:["app.component.scss"]
})
export class AppComponent implements OnInit {
    @ViewChild(AccountComponent) account_modal : AccountComponent;
    isNavShow = false;
    ngiftest = false;

    constructor(private routerExtensions : RouterExtensions){

    }
    ngOnInit(): void {
        
        // navl.translateX = 100;
        if (!isAndroid) {
            return;
        }
        Application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
            console.log("back button pressed on AppComponent");
            if(this.isNavShow === true){
                data.cancel = true;
                this.onTabAccount();
                console.log("this.isNavShow == true");
            }
        // if (this.routerExtensions.router.isActive("/articles", false)) {
        //     data.cancel = true; // prevents default back button behavior
        // }
        });
    }

    onTabAccount(){
        console.log("click account button");
        this.isNavShow = !this.isNavShow;
        this.account_modal.toggle();        
    }

    // click handler button inside modal
    modal_inside_click(event){
        console.log("modal_inside_click");
        console.log(event);
    }
}
