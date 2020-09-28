import { Component, OnInit, ViewChild } from "@angular/core";
import { Application } from "@nativescript/core";
import { RouterExtensions } from "@nativescript/angular";
import { isAndroid } from "tns-core-modules/ui/core/view/view";
import { AndroidApplication, AndroidActivityBackPressedEventData } from "tns-core-modules/application/application";

@Component({
    selector: "Main",
    templateUrl: "./main.component.html",
    styleUrls:["./main.component.scss"]
})
export class MainComponent implements OnInit {

    constructor(private routerExtensions : RouterExtensions) {
        console.log("constructor MainComponent");
    }

    ngOnInit(): void {
        console.log("ngOnInit MainComponent");
        
    }
}
