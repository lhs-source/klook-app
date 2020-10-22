import { Component, OnInit } from "@angular/core";
import { AnimationCurve } from "@nativescript/core/ui/enums";
import { RouterExtensions } from "@nativescript/angular";
import { ActivatedRoute } from "@angular/router";
import { Application, AndroidApplication, AndroidActivityBackPressedEventData, isAndroid } from "tns-core-modules";
import { CustomTransitionBack } from "../../util/klook-transition";

@Component({
    selector: "testpage",
    templateUrl: "./testpage.component.html",
    styleUrls: ["./testpage.component.scss"]
})
export class TestpageComponent implements OnInit {
    tag = this.constructor.name;

    constructor(private routerExtensions: RouterExtensions, private activatedRoute: ActivatedRoute) {
        console.log(`${this.tag} constructor `)

        if (isAndroid) {
            Application.android.off(AndroidApplication.activityBackPressedEvent);
            Application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
                console.log("back button pressed on " + this.tag);
                data.cancel = true;
                this.routerExtensions.navigate(['/main/home'], { transition: { instance : new CustomTransitionBack(250, AnimationCurve.linear)}, clearHistory : true});
            });
        }
    }

    ngOnInit(): void {
        console.log(`${this.tag} ngOnInit`);
        console.log(this.routerExtensions.router.url);
    }

    // actionbar emit click close
    actionbar_click_close(isclose) {
        console.log(this.tag + " actionbar close button clicked = " + isclose);

        this.routerExtensions.navigate(['/main/home'], {
            clearHistory: true,
            transition: { instance : new CustomTransitionBack(250, AnimationCurve.linear) }
        });
    }
}
