import { Component, OnInit } from "@angular/core";

@Component({
    selector: "qr-pay",
    templateUrl: "./qr-pay.component.html",
    styleUrls: ["./qr-pay.component.scss"]
})
export class QrPayComponent implements OnInit {

    timer = Date.now();
    // 3 mins
    secounds = 180;
    interval;

    constructor() {
        console.log("constructor QrPayComponent");
    }

    ngOnInit(): void {
        console.log("ngOnInit QrPayComponent");

        this.interval = setInterval(() => {
            if (this.secounds > 0) {
                this.secounds--;
                // console.log("this.secounds");
            } else {
                this.secounds = 60;
            }
        }, 1000);
    }

    resetTimer(){
        clearInterval(this.interval);
        this.secounds = 180;
        this.interval = setInterval(() => {
            if (this.secounds > 0) {
                this.secounds--;
                // console.log("this.secounds");
            } else {
                this.secounds = 60;
            }
        }, 1000);
    }
}
