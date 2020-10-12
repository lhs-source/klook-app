import { Component, ElementRef, OnInit, ViewChild, Output, EventEmitter, Input } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";

// <title title="title" point="122" point_unit="HKD" backgroundColor="#ff5722">
// </title>
@Component({
    selector: "title",
    templateUrl: "./title.component.html",
    styleUrls: ["./title.component.scss"]
})
export class TitleComponent implements OnInit {
    tag = this.constructor.name;

    @Input() title : string;
    @Input() point;
    @Input() point_unit;
    @Input() backgroundColor;

    constructor(private routerExtensions: RouterExtensions) {
        console.log(`${this.tag} constructor `)

    }

    ngOnInit(): void {
        console.log(`${this.tag} ngOnInit`);
        console.log(this.routerExtensions.router.url);

        
    }

    ngOnDestroy(){
        console.log(`${this.tag} ngOnDestroy`);
    }
}
