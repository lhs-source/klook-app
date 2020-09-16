import { Component, OnInit, ViewChild, ElementRef, ComponentFactoryResolver, ViewContainerRef } from "@angular/core";
import { Application, EventData } from "@nativescript/core";
import { LayoutBase } from "@nativescript/core/ui";

import { PinComponent } from "../pin/pin.component";
import { NavDirective } from "./nav.directive";

@Component({
    selector: "Settings",
    templateUrl: "./settings.component.html"
})
export class SettingsComponent implements OnInit {
    @ViewChild('rootlayout', {static:true}) rootview : ElementRef;
    @ViewChild(NavDirective) nav: NavDirective;

    ngiftest = true;

    constructor(private componentFactoryResolver: ComponentFactoryResolver,
        public viewContainerRef: ViewContainerRef) {
        // Use the component constructor to inject providers.
        console.log("constructor SettingsComponent");
    }

    ngOnInit(): void {
        // Init your component properties here.
        console.log("ngOnInit SettingsComponent");
        let lb = this.rootview.nativeElement as LayoutBase;
        

        // lb.addChild(this.browse);
    }

    ngAfterViewInit():void{
        console.log("ngAfterViewInit SettingsComponent");
        let fac = this.componentFactoryResolver.resolveComponentFactory(PinComponent);
        // console.log(fac);
        // console.log(this.nav);
        let nav_view_cot = this.nav.viewContainerRef;
        // console.log(nav_view_cot);
        // nav_view_cot.clear();
        let new_comp = nav_view_cot.createComponent(fac);
        // console.log(new_comp);

    }

    onTap(event: EventData){
        this.ngiftest = !this.ngiftest;
        console.log("tap " + this.ngiftest);
    }
}
