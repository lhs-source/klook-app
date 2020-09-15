import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Application, EventData } from "@nativescript/core";
import { BrowseComponent } from "../browse/browse.component";
import { LayoutBase } from "@nativescript/core/ui";

@Component({
    selector: "Settings",
    templateUrl: "./settings.component.html"
})
export class SettingsComponent implements OnInit {
    @ViewChild('rootlayout', {static:true}) rootview : ElementRef;
    @ViewChild(BrowseComponent) browse : BrowseComponent;

    ngiftest = true;

    constructor() {
        // Use the component constructor to inject providers.
        console.log("constructor SettingsComponent");
    }

    ngOnInit(): void {
        // Init your component properties here.
        console.log("ngOnInit SettingsComponent");
        let lb = this.rootview.nativeElement as LayoutBase;
        // lb.addChild(this.browse);
    }

    onTap(event: EventData){
        this.ngiftest = !this.ngiftest;
        console.log("tap " + this.ngiftest);
    }
}
