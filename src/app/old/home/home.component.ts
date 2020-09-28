import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Application, LayoutBase, View, Label } from "@nativescript/core";
import { CubicBezierAnimationCurve } from "@nativescript/core/ui/animation";
import { EventData } from "@nativescript/core/data/observable";
import { TouchGestureEventData } from "@nativescript/core/ui/gestures";
import { TextField } from "tns-core-modules/ui/text-field";

@Component({
    selector: "Home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
    @ViewChild('layout', { static: true }) layout: ElementRef;
    @ViewChild('button', { static: true }) button: ElementRef;

    charge_money :string;

    constructor() {
        // Use the component constructor to inject providers.
        console.log("constructor HomeComponent");
    }

    ngOnInit(): void {
        console.log("ngOnInit HomeComponent");

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

    // charge money textfield
    onReturnPress(args) {
        // returnPress event will be triggered when user submits a value
        let textField = args.object as TextField;

        // Gets or sets the placeholder text.
        console.log(textField.hint);
        // Gets or sets the input text.
        console.log(textField.text);
        // Gets or sets the secure option (e.g. for passwords).
        console.log(textField.secure);

        // Gets or sets the soft keyboard type. Options: "datetime" | "phone" | "number" | "url" | "email"
        console.log(textField.keyboardType);
        // Gets or sets the soft keyboard return key flavor. Options: "done" | "next" | "go" | "search" | "send"
        console.log(textField.returnKeyType);
        // Gets or sets the autocapitalization type. Options: "none" | "words" | "sentences" | "allcharacters"
        console.log(textField.autocapitalizationType);

        // Gets or sets a value indicating when the text property will be updated.
        console.log(textField.updateTextTrigger);
        // Gets or sets whether the instance is editable.
        console.log(textField.editable);
        // Enables or disables autocorrection.
        console.log(textField.autocorrect);
        // Limits input to a certain number of characters.
        console.log(textField.maxLength);

        setTimeout(() => {
            textField.dismissSoftInput(); // Hides the soft input method, ususally a soft keyboard.
        }, 100);
    }
}
