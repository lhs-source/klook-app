import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { isAndroid, Application, AndroidApplication, AndroidActivityBackPressedEventData } from "tns-core-modules";

@Component({
    selector: "qr-pay",
    templateUrl: "./qr-pay.component.html",
    styleUrls: ["./qr-pay.component.scss"]
})
export class QrPayComponent implements OnInit {
    tag = this.constructor.name;

    timer = Date.now();
    // 3 mins
    secounds = 180;
    interval;

    constructor(private routerExtensions: RouterExtensions) {
        console.log(`${this.tag} constructor `)
        
        if (isAndroid) {
            // Application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
            //     console.log("back button pressed on " + this.tag);
            //     data.cancel = true;
            //     this.routerExtensions.navigate(['/main/home'], {clearHistory : true});
            // });
        }
    }

    ngOnInit(): void {
        console.log(`${this.tag} ngOnInit`);
        console.log(this.routerExtensions.router.url);

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
