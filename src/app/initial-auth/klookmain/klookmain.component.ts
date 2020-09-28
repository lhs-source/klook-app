import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";

@Component({
    selector: "KlookMain",
    templateUrl: "./klookmain.component.html",
    styleUrls:["./klookmain.component.scss"]
})
export class KlookMainComponent implements OnInit {
    constructor(private routerExtensions : RouterExtensions) {
        console.log("constructor KlookMainComponent");
    }

    ngOnInit(): void {
        console.log("ngOnInit KlookMainComponent");
        console.log(this.routerExtensions.router.url);
    }
}
