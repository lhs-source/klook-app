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

    @Input('margin') margin = 16;
    @Output('tapNumber') tapNumber : EventEmitter<any> = new EventEmitter();

    nums=[
        1, 2, 3, 4, 5, ' ', 6, ' ', 7, 8, 9, 0
    ]

    constructor(private routerExtensions: RouterExtensions) {
        console.log(`${this.tag} constructor `)

    }

    ngOnInit(): void {
        console.log(`${this.tag} ngOnInit`);
        console.log(this.routerExtensions.router.url);

        let wraplb = this.wrap.nativeElement as WrapLayout;
        console.log(screen.mainScreen.widthDIPs);
        wraplb.itemWidth = screen.mainScreen.widthDIPs / 4 - this.margin/2;
    }

    onTouchNum(event : TouchGestureEventData, input){
        if (event.action !== "down") {
            return;
        }else{
            console.log(input);
            this.tapNumber.emit(input);
        }
    }

    ngOnDestroy(){
        console.log(`${this.tag} ngOnDestroy`);
    }
}
