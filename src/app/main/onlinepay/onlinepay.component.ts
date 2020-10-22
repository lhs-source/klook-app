import { Component, OnInit } from "@angular/core";
import { AnimationCurve } from "@nativescript/core/ui/enums";
import { RouterExtensions } from "@nativescript/angular";
import { ActivatedRoute } from "@angular/router";
import { Application, AndroidApplication, AndroidActivityBackPressedEventData, isAndroid } from "tns-core-modules";
import { trigger, transition, style, animate } from "@angular/animations";
import { CustomTransitionBack } from "../../util/klook-transition";

@Component({
    selector: "onlinepay",
    templateUrl: "./onlinepay.component.html",
    styleUrls: ["./onlinepay.component.scss"],
    animations: [
        trigger('fade', [
            transition(':enter', [
                style({ opacity: 0, transform: "translateY(20)" }),
                animate('1s ease-out', style({ opacity: 1, transform: "translateY(0)" }))
            ]),
            transition(':leave', [
                style({ opacity: 1, transform: "translateY(0)" }),
                animate('1s ease-in', style({ opacity: 0, transform: "translateY(20)" }))
            ])
        ])
    ]
})
export class OnlinepayComponent implements OnInit {
    tag = this.constructor.name;

    is_front = true;

    card_info = {
        cardno: "9445-1234-4567-8901",
        exp: "2025년 05월",
        cvc: "989"
    }

    constructor(private routerExtensions: RouterExtensions, private activatedRoute: ActivatedRoute) {
        console.log(`${this.tag} constructor `)

        if (isAndroid) {
            Application.android.off(AndroidApplication.activityBackPressedEvent);
            Application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
                console.log("back button pressed on " + this.tag);
                data.cancel = true;
                // this.routerExtensions.back();
                this.routerExtensions.navigate(['/main/home'], { transition: { instance : new CustomTransitionBack(250, AnimationCurve.linear)}, clearHistory : true});
                // exit();
            });
        }
    }

    ngOnInit(): void {
        console.log(`${this.tag} ngOnInit`);
        console.log(this.routerExtensions.router.url);
    }

    onTapFront() {
        console.log("is_front = ", this.is_front);
        this.is_front = false;
    }
    onTapBack() {
        console.log("is_front = ", this.is_front);
        this.is_front = true;
    }

    // actionbar emit click close
    actionbar_click_close(isclose) {
        console.log(this.tag + " actionbar close button clicked = " + isclose);

        this.routerExtensions.navigate(['/main/home'], {
            clearHistory: true,
            transition: { instance : new CustomTransitionBack(250, AnimationCurve.linear) }
        });
    }

    onTapOk() {
        this.routerExtensions.navigate(['/main/home'], {
            clearHistory: true,
            transition: { instance : new CustomTransitionBack(250, AnimationCurve.linear) }
        });
    }

    navigateBack(event) {
        console.log(this.tag + " navigateBack");
        if (this.routerExtensions.canGoBack()) {
            this.routerExtensions.back({ relativeTo: this.activatedRoute });
        } else {
            this.routerExtensions.navigate(['/main/home'], { transition: { name: 'fade', duration: 250, curve: AnimationCurve.easeOut }, clearHistory: true });
        }
    }
}
