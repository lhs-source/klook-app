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
    tag = this.constructor.name;

    constructor(private routerExtensions : RouterExtensions) {
        console.log(`${this.tag} constructor `)
    }

    ngOnInit(): void {
        console.log(`${this.tag} ngOnInit`);
        console.log(this.routerExtensions.router.url);
        
    }
}
