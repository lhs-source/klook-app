import { Component, OnInit, ElementRef, ViewChild, ViewChildren } from "@angular/core";

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
