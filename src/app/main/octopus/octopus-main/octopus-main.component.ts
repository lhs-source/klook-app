import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";

import { AnimationCurve } from "@nativescript/core/ui/enums";
import { isAndroid, Application, AndroidApplication, AndroidActivityBackPressedEventData, LayoutBase, ViewBase, Label, Image, View } from "tns-core-modules";
import { screen } from "tns-core-modules/platform/platform"

import { CustomTransition, CustomTransitionBack } from "../../../util/klook-transition";
import { DataService } from "../../../service/data.service";
import { OctopusService } from "../../../service/octopus.service";
import { CountryService } from "../../../service/country.service";

@Component({
    selector: "octopus-main",
    templateUrl: "./octopus-main.component.html",
    styleUrls: ["./octopus-main.component.scss"]
})
export class OctopusMainComponent implements OnInit {
    tag = this.constructor.name;

    cardlist = [
        "~/images/card_ezlink.png",
        "~/images/card_octopus.png",
        "~/images/card_oyster.png",
    ];
    selected_country = "홍콩";

    constructor(private routerExtensions: RouterExtensions, 
        private dataService : DataService,
        private octopusService : OctopusService,
        private countryService : CountryService) {
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

    callbackSelect(index){
        console.log(this.tag + " callbackSelect = " + index);
        let list = ["싱가포르", "홍콩", "영국"];
        this.selected_country = list[index];
    }

    callbackTapCard(index) {
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
