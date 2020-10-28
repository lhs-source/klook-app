import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Application, LayoutBase, View, Label } from "@nativescript/core";
import { EventData } from "@nativescript/core/data/observable";
import { TouchGestureEventData } from "@nativescript/core/ui/gestures";

import { AnimationCurve } from "@nativescript/core/ui/enums";

import { RouterExtensions } from "@nativescript/angular";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "../../service/auth.service";
import { CustomTransition, CustomTransitionBack } from "../../util/klook-transition";

import * as Toast from 'nativescript-toast';

@Component({
    selector: "Pin",
    templateUrl: "./pin.component.html",
    styleUrls: ["./pin.component.scss"]
})
export class PinComponent implements OnInit {
    tag = this.constructor.name;
    @ViewChild('pincode', { static: true }) pincode: ElementRef;
    pin: string = "";

    old_color = "#ddd";
    new_color = "gold";

    constructor(private routerExtensions: RouterExtensions, private route: ActivatedRoute, private authService: AuthService) {
        // Use the component constructor to inject providers.
        console.log("[PinComponent] constructor");
    }

    ngOnInit(): void {
        // Init your component properties here.
        console.log("[PinComponent] ngOnInit");

        console.log(this.routerExtensions.router.url);
    }


    callback_tapNumber(num) {
        console.log(this.tag, "callback_tapNumber =", num);
        // let kf = this.amounttf.nativeElement as TextField;
        // console.log(kf.text);

        if (num === "back") {
            if (this.pin.length > 0) {
                // console.log("ok del")
                this.pin = this.pin.substring(0, this.pin.length - 1);
            }
        } else if (num === "enter") {
        }
        else {
            if (this.pin.length < 6) {
                this.pin += String(num);
            }
        }
        console.log("pin = " + this.pin);
        this.changePinCode();

        setTimeout(() => {
            if (this.pin.length === 6) {
                // 6 chars ok
                if (this.authService.pin === this.pin) {
                    if (this.authService.is_registered === true) {
                        // already register
                        this.routerExtensions.navigate(["/main"], {
                            clearHistory: true, 
                            transition: { instance: new CustomTransition(250, AnimationCurve.linear) }
                        });
                    } else {
                        // new register
                        this.routerExtensions.navigate(["../done"], {
                            relativeTo: this.route, clearHistory: true, transition: {
                                name: 'slide',
                                duration: 250,
                                curve: AnimationCurve.easeOut
                            }
                        });
                    }
                } else {
                    Toast.makeText("비밀번호가 맞지 않습니다" + this.authService.pin).show();
                    this.pin = "";
                    this.changePinCode();
                }
            }
        });
    }

    changePinCode() {
        let pincode_lb = this.pincode.nativeElement as LayoutBase;
        let count = 0;
        pincode_lb.eachChildView((view: View) => {
            let la = view as Label;
            if (count < this.pin.length) {
                la.backgroundColor = this.new_color;
            } else {
                la.backgroundColor = this.old_color;
            }
            count = count + 1;
            return true;
        });
    }
    // actionbar emit click close
    actionbar_click_close(isclose){
        console.log(this.tag + " actionbar close button clicked = " + isclose);
        this.routerExtensions.navigate(['/initial-auth/klook-main'], { 
            clearHistory:true, 
            transition: { instance : new CustomTransitionBack(250, AnimationCurve.linear) } 
        });
    }
}
