import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { Statusbar } from "nativescript-plugin-statusbar";

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
    styleUrls: ["app.component.scss"]
})
export class AppComponent implements OnInit {
    tag = this.constructor.name;
    constructor(private routerExtensions: RouterExtensions,
        private statueBar:Statusbar) {
        console.log(this.tag, "constructor");
    }
    ngOnInit(): void {
        console.log(this.tag, "ngOnInit");

        // this.statueBar.setNavigationBarColorTransparent();
        // this.statueBar.setStatusBarColorTransparent();
    }
}
