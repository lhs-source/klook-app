import { Component, OnInit } from "@angular/core";

import { AnimationCurve } from "@nativescript/core/ui/enums";

import { RouterExtensions } from "@nativescript/angular";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "Pin-root",
    templateUrl: "./pin-root.component.html"
})
export class PinRootComponent implements OnInit {
    constructor(private routerExtensions : RouterExtensions , private route: ActivatedRoute){
        console.log("[PinRootComponent] constructor");
        console.log(this.routerExtensions.router.url);
        // this.routerExtensions.router.navigate([{outlets: {pinoutlet: 'new'}}], {relativeTo: this.route});
        this.routerExtensions.navigate(['new'], {relativeTo: this.route});
    }

    ngOnInit():void{
        console.log("[PinRootComponent] ngOnInit");

    }

    tap(){
        console.log("tap");
        // this.routerExtensions.router.navigate(['input'], {relativeTo: this.route});
    }
}