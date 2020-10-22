import { Component, ElementRef, OnInit, ViewChild, Output, EventEmitter, Input } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { TouchGestureEventData, WrapLayout } from "tns-core-modules";
import { screen } from 'tns-core-modules/platform';

// <keypad-number keypad-number="keypad-number" point="122" point_unit="HKD" backgroundColor="#ff5722">
// </keypad-number>
@Component({
    selector: "keypad-number",
    templateUrl: "./keypad-number.component.html",
    styleUrls: ["./keypad-number.component.scss"]
})
export class KeypadNumberComponent implements OnInit {
    tag = this.constructor.name;

    @ViewChild('wrap', {static:true}) wrap : ElementRef;

    // keypad margin not padding
    @Input('margin') margin = 16;

    // when user tap a number pad
    @Output('tapNumber') tapNumber : EventEmitter<any> = new EventEmitter();

    nums=[
        1, 2, 3, 4, 5, ' ', 6, ' ', 7, 8, 9, 0
    ]

    constructor() {}
    ngOnInit(): void {
        // setting wrap container children width
        let wraplb = this.wrap.nativeElement as WrapLayout;
        wraplb.itemWidth = screen.mainScreen.widthDIPs / 4 - this.margin/2;
    }

    // on touch number pad
    onTouchNum(event : TouchGestureEventData, input){
        if (event.action !== "down") {
            return;
        }else{
            // emit parent callback
            this.tapNumber.emit(input);
        }
    }
}
