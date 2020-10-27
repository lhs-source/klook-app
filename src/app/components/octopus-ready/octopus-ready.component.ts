import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { AnimationCurve } from "@nativescript/core/ui/enums";
import { isAndroid, screen } from "tns-core-modules/platform/platform"
import { Image, LayoutBase } from "tns-core-modules";
import { RouterExtensions } from "@nativescript/angular";
import { AuthService } from "../../service/auth.service";

// * Usage
// <octopus-ready octopus-ready="octopus-ready" point="122" point_unit="HKD" backgroundColor="#ff5722"></octopus-ready>
@Component({
    selector: "octopus-ready",
    templateUrl: "./octopus-ready.component.html",
    styleUrls: ["./octopus-ready.component.scss"]
})
export class OctopusReadyComponent implements OnInit {
    tag = this.constructor.name;
    @ViewChild('strpivot', { static: true }) strpivot: ElementRef;
    @ViewChild('octopus', { static: true }) octopus: ElementRef;
    @ViewChild('octopusframe', { static: true }) octopusframe: ElementRef;

    @ViewChild('octopuscard', { static: true }) octopuscard: ElementRef;

    @ViewChild('arrow', { static: true }) arrow: ElementRef;
    @ViewChild('card', { static: true }) card: ElementRef;

    // octopus pan vairables
    octopus_card_loc = {
        prevDeltaX: 0,
        prevDeltaY: 0,
        originX: 0,
        originY: 0,
    };
    octopus_frame_loc = {
        originX: 0,
        originY: 0,
    }

    card_height = 420;
    card_marginTop = 8;

    trans_duration = 250;

    constructor(private routerExtensions: RouterExtensions,
        private authService : AuthService) { }
    ngOnInit(): void { }

    // translate octopus view to bottom of screen
    onLayoutChangedOctopuscard(event) {
        console.log(this.tag + " onLayoutChangedOctopuscard");
        let pivot = this.strpivot.nativeElement as LayoutBase;
        let lbc = this.octopuscard.nativeElement as LayoutBase;
        let lbf = this.octopusframe.nativeElement as LayoutBase;

        let loc = pivot.getLocationOnScreen();
        lbc.translateY = loc.y - 16;
        lbf.translateY = lbc.translateY - this.card_marginTop;
    }

    onPanFrame(event) {
        // console.log("onDragCard HomeComponent");
        let lbc = this.octopuscard.nativeElement as LayoutBase;
        let lbf = this.octopusframe.nativeElement as LayoutBase;
        let lb = this.octopus.nativeElement as LayoutBase;

        if (event.state === 1) // down
        {
            this.octopus_card_loc.originX = lbc.translateX;
            this.octopus_card_loc.originY = lbc.translateY;
            this.octopus_card_loc.prevDeltaY = 0;

            this.octopus_frame_loc.originX = lbf.translateX;
            this.octopus_frame_loc.originY = lbf.translateY;
        }
        else if (event.state === 2) // panning
        {
            if (lbc.translateY < screen.mainScreen.heightDIPs / 2) {
                // low velocity
                lbc.translateY += (event.deltaY - this.octopus_card_loc.prevDeltaY) / 2;
                lbf.translateY += (event.deltaY - this.octopus_card_loc.prevDeltaY) / 2;
            } else {
                // normal veloc
                lbc.translateY += event.deltaY - this.octopus_card_loc.prevDeltaY;
                lbf.translateY += event.deltaY - this.octopus_card_loc.prevDeltaY;
            }

            this.octopus_card_loc.prevDeltaY = event.deltaY;

            lb.opacity = (1 - (lbc.translateY / screen.mainScreen.heightDIPs)) / 2;
            if (lb.opacity > 1) {
                lb.opacity = 1;
            } else if (lb.opacity < 0) {
                lb.opacity = 0;
            }

            lbf.opacity = (1 - (lbc.translateY / screen.mainScreen.heightDIPs)) * 1.5;
            console.log(lbf.opacity);
            if (lbf.opacity > 1) {
                lbf.opacity = 1;
            } else if (lbf.opacity < 0) {
                lbf.opacity = 0;
            }
        }
        else if (event.state === 3) // up
        {
            let p = screen.mainScreen.heightDIPs / screen.mainScreen.heightPixels;
            console.log("this.octopus_card_loc.prevDeltaY", this.octopus_card_loc.prevDeltaY);
            if (lbc.translateY < (screen.mainScreen.heightDIPs / 1.5) || this.octopus_card_loc.prevDeltaY < -100) {
                // goto octopus page
                lbc.animate({
                    translate: { x: this.octopus_card_loc.originX, y: (screen.mainScreen.heightDIPs - lbc.getMeasuredHeight() * p) / 3 },
                    duration: 100,
                    curve: AnimationCurve.linear
                }).then(() => {
                    let card = this.card.nativeElement as Image;
                    let arr = this.arrow.nativeElement as Image;
                    arr.opacity = 0;
                    // card.marginTop=64;
                    // card.marginBottom=64;
                    // card.animate({
                    //     rotate:90,
                    //     duration: 150,
                    //     curve: AnimationCurve.linear
                    // }).then(() => {
                        setTimeout(() => {
                            if(this.authService.has_octopus === true){
                                // issued octopus 
                                this.routerExtensions.navigate(['/main/octopus/main'], { 
                                    clearHistory: true, 
                                    transition: { name: 'fade', duration: this.trans_duration, curve: AnimationCurve.easeOut } 
                                });
                            }else{
                                // no octopus
                                this.routerExtensions.navigate(['/main/octopus/new'], { 
                                    clearHistory: true, 
                                    transition: { name: 'fade', duration: this.trans_duration, curve: AnimationCurve.easeOut } 
                                });
                            }
                        }, 100);
                    // });
                });
                lbf.animate({
                    translate: { x: this.octopus_frame_loc.originX, y: 0 },
                    opacity: 1,
                    duration: 100,
                    curve: AnimationCurve.linear
                })
            } else {
                // goto origin location
                lbc.animate({
                    translate: { x: this.octopus_card_loc.originX, y: this.octopus_card_loc.originY },
                    duration: this.trans_duration,
                    curve: AnimationCurve.easeOut
                });
                lb.animate({
                    opacity: 0,
                    duration: this.trans_duration,
                    curve: AnimationCurve.easeOut
                });
                lbc.translateX = this.octopus_card_loc.originX;
                lbc.translateY = this.octopus_card_loc.originY;
                lbf.animate({
                    translate: { x: this.octopus_frame_loc.originX, y: this.octopus_frame_loc.originY },
                    opacity: 0,
                    duration: 100,
                    curve: AnimationCurve.easeOut
                })
            }
        }
    }
}
