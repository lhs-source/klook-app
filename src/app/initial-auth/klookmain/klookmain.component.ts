import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";

@Component({
    selector: "KlookMain",
    templateUrl: "./klookmain.component.html",
    styleUrls:["./klookmain.component.scss"]
})
export class KlookMainComponent implements OnInit {
    tag = this.constructor.name;
    constructor(private routerExtensions : RouterExtensions) {
        console.log(`${this.tag} constructor `)
    }

    ngOnInit(): void {
        console.log(`${this.tag} ngOnInit`);
        console.log(this.routerExtensions.router.url);
    }
}
