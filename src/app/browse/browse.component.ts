import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Application, LayoutBase, View, Label } from "@nativescript/core";
import { EventData } from "@nativescript/core/data/observable";
import { TouchGestureEventData } from "@nativescript/core/ui/gestures";

@Component({
    selector: "Browse",
    templateUrl: "./browse.component.html",
    styleUrls:["./browse.component.scss"]
})
export class BrowseComponent implements OnInit {
    @ViewChild('pincode', {static: true}) pincode : ElementRef;
    @ViewChild('pinpad', {static: true}) pinpad : ElementRef;
    pin : string = "";

    constructor() {
        // Use the component constructor to inject providers.
        console.log("constructor BrowseComponent");
    }

    ngOnInit(): void {
        // Init your component properties here.
        console.log("ngOnInit BrowseComponent");

        let pinpad_lb = this.pinpad.nativeElement as LayoutBase;
        // console.log(pinpad_lb);
        pinpad_lb.eachChildView((view:View)=>{
            let la = view as Label;
            // console.log(la);
            la.on("touch", (args:TouchGestureEventData) =>{
                console.log("tab! " + la.text);
                if(args.action !== "down"){
                    return;
                }
                else{
                    if(la.text === "del"){
                        if(this.pin.length > 0){
                            // console.log("ok del")
                            this.pin = this.pin.substring(0, this.pin.length - 1);
                        }
                    }else{
                        if(this.pin.length < 6){
                            this.pin += la.text;
                        }
                    }
                    console.log("pin = " + this.pin);
                    this.changePinCode();
                }
            });
            return true;
        });
    }

    changePinCode(){
        let pincode_lb = this.pincode.nativeElement as LayoutBase;
        let count = 0;
        let old_color = "gray";
        pincode_lb.eachChildView((view:View)=>{
            let la = view as Label;
            // console.log(count);
            if(count < this.pin.length){
                la.backgroundColor = "gold";
            }else{
                la.backgroundColor = old_color;
            }
            count = count + 1;
            return true;
        });
    }
}
