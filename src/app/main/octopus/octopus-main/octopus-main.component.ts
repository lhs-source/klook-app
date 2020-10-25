import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";

import { AnimationCurve } from "@nativescript/core/ui/enums";
import { isAndroid, Application, AndroidApplication, AndroidActivityBackPressedEventData, LayoutBase, ViewBase, Label, Image, View } from "tns-core-modules";
import { screen } from "tns-core-modules/platform/platform"


import { Carousel } from "nativescript-carousel";
import { CustomTransition, CustomTransitionBack } from "../../../util/klook-transition";

@Component({
    selector: "octopus-main",
    templateUrl: "./octopus-main.component.html",
    styleUrls: ["./octopus-main.component.scss"]
})
export class OctopusMainComponent implements OnInit {
    tag = this.constructor.name;
    @ViewChild("myCarousel", { static: false }) carouselView: ElementRef<Carousel>;

    cardlist = [
        "~/images/card_ezlink.png",
        "~/images/card_octopus.png",
        "~/images/card_oyster.png",
        "~/images/card_ezlink.png",
    ];

    constructor(private routerExtensions: RouterExtensions) {
        console.log(`${this.tag} constructor `)

        if (isAndroid) {
            Application.android.off(AndroidApplication.activityBackPressedEvent);
            Application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
                console.log(this.tag + " back button pressed ");
                if (this.routerExtensions.router.isActive('/main/octopus/main', false) === true) {
                    data.cancel = true;
                    this.routerExtensions.navigate(['/main/home'], {
                        transition: { instance: new CustomTransitionBack(250, AnimationCurve.linear), },
                        clearHistory: true
                    });
                } else {
                    data.cancel = false;
                }
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
            transition: { instance: new CustomTransitionBack(250, AnimationCurve.linear) }
        });
    }

    onTapCard(index) {
        console.log(this.tag + " onTapCard = " + index);
        this.routerExtensions.navigate(['/main/octopus/charge', index], {
            transition: { instance: new CustomTransition(250, AnimationCurve.linear) },
        });
    }

    navigateUseLoc(event) {
        console.log(this.tag + " navigateChargePoint OctopusMainComponent");
        this.routerExtensions.navigate(['/main/octopus/use-loc'], {
            transition: { instance: new CustomTransition(250, AnimationCurve.linear) }
        });
    }
}
