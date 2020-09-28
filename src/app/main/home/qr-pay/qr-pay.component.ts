import { Component, OnInit } from "@angular/core";

@Component({
    selector: "qr-pay",
    templateUrl: "./qr-pay.component.html",
    styleUrls:["./qr-pay.component.scss"]
})
export class QrPayComponent implements OnInit {
    constructor() {
        console.log("constructor QrPayComponent");
    }

    ngOnInit(): void {
        console.log("ngOnInit QrPayComponent");
    }
}
