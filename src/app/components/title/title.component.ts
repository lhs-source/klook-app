import { Component, OnInit, Input } from "@angular/core";

// * Usage
// <title title="title" point="122" point_unit="HKD" backgroundColor="#ff5722"></title>
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

    constructor() {}
    ngOnInit(): void {}
}
