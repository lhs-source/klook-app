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
    constructor(private routerExtensions : RouterExtensions){

    }
    ngOnInit(): void {

    }
}
