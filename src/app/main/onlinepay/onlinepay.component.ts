import { Component, OnInit } from "@angular/core";
import { AnimationCurve } from "@nativescript/core/ui/enums";
import { RouterExtensions } from "@nativescript/angular";
import { ActivatedRoute } from "@angular/router";
import { Application, AndroidApplication, AndroidActivityBackPressedEventData, isAndroid } from "tns-core-modules";

@Component({
    selector: "onlinepay",
    templateUrl: "./onlinepay.component.html",
    styleUrls: ["./onlinepay.component.scss"]
})
export class OnlinepayComponent implements OnInit {
    tag = this.constructor.name;
    constructor(private routerExtensions: RouterExtensions, private activatedRoute: ActivatedRoute) {
        console.log(`${this.tag} constructor `)

        if (isAndroid) {
            Application.android.off(AndroidApplication.activityBackPressedEvent);
            Application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
                console.log(this.tag + " back button pressed ");
                data.cancel = true;
                this.routerExtensions.navigate(['/main/home'], { clearHistory: true });
            });
        }
    }

    ngOnInit(): void {
        console.log(`${this.tag} ngOnInit`);
        console.log(this.routerExtensions.router.url);
    }
    navigateBack(event) {
        console.log(this.tag + " navigateBack");
        if (this.routerExtensions.canGoBack()) {
            this.routerExtensions.back({ relativeTo: this.activatedRoute });
        } else {
            this.routerExtensions.navigate(['/main/home'], { transition: { name: 'fade', duration: 350, curve: AnimationCurve.easeOut }, clearHistory: true });
        }
    }
}
