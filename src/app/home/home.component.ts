import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Application, LayoutBase, View, Label } from "@nativescript/core";
import { CubicBezierAnimationCurve } from "@nativescript/core/ui/animation";
import { EventData } from "@nativescript/core/data/observable";
import { TouchGestureEventData } from "@nativescript/core/ui/gestures";

@Component({
    selector: "Home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
    @ViewChild('layout', { static: true }) layout: ElementRef;
    @ViewChild('button', { static: true }) button: ElementRef;

    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        console.log("load");

        // let lb = args.object as LayoutBase;
        let lb = this.layout.nativeElement as LayoutBase;
        let rootView = lb.parentNode.getViewById("selected") as View;

        lb.eachChildView((view: View) => {
            if (view.className === "selected") {
                return;
            }
            view.on("tap", (a: EventData) => {
                let label = a.object as View;
                let loc = label.getLocationRelativeTo(lb);
                // console.log(loc);

                rootView.animate({
                    translate: { x: loc.x - 8, y: 0 },
                    duration: 350,
                    curve: new CubicBezierAnimationCurve(0.6, 0.72, 0, 1)
                });
            });
            return true;
        });
    }

    onClickTab(args: EventData) {
        console.log("tab!")
    }
    onTouchTab(args: TouchGestureEventData) {
        console.log("touch!");
        if (args.action !== "down") {
            return;
        }else{
            let x = args.getX();
            let y = args.getY();
    
            let btn = args.object as View;
            let wrapper = btn.parentNode as LayoutBase;
            console.log(wrapper.typeName);
            console.log(wrapper.className);
    
            let circle = new Label();
    
            let d = Math.max(Number(btn.height), Number(btn.width));
    
            circle.width = d;
            circle.height = d;
            circle.borderRadius = d / 2;
            circle.top = y - d / 2;
            circle.left = x - d / 2;
            circle.backgroundColor = 'white';
            circle.opacity = 0;
    
            wrapper.addChild(circle);
    
            circle.animate({
                scale:{x:0, y:0},
                opacity: 0.4,
                duration: 1
            }).then(()=>{
                circle.animate({
                    scale:{x:2, y:2},
                    opacity: 0,
                    duration: 500
                }).then(()=>{
                    wrapper.removeChild(circle);
                });
            });
        }

    }
}
