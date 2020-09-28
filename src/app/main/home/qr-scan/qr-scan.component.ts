import { Component, OnInit } from "@angular/core";

@Component({
    selector: "qr-scan",
    templateUrl: "./qr-scan.component.html",
    styleUrls:["./qr-scan.component.scss"]
})
export class QrScanComponent implements OnInit {
    constructor() {
        console.log("constructor QrScanComponent");
    }

    ngOnInit(): void {
        console.log("ngOnInit QrScanComponent");
    }
}
