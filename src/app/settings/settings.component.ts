import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Application } from "@nativescript/core";
import { BrowseComponent } from "../browse/browse.component";
import { LayoutBase } from "@nativescript/core/ui";

@Component({
    selector: "Settings",
    templateUrl: "./settings.component.html"
})
export class SettingsComponent implements OnInit {
    @ViewChild('rootlayout', {static:true}) rootview : ElementRef;
    @ViewChild(BrowseComponent) browse : BrowseComponent;
    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
        let lb = this.rootview.nativeElement as LayoutBase;
        // lb.addChild(this.browse);
    }

}
