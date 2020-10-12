import { Component, ElementRef, OnInit, ViewChild, Output, EventEmitter, Input, ViewChildren } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { EventData, TouchGestureEventData, View, LayoutBase, Label, Color, knownFolders, Style } from "tns-core-modules";
import * as colors from "tns-core-modules/color/known-colors";

// <ripple-button row="4" text="충전하기" backgroundColor="#ff5722" textColor="white"></ripple-button>
@Component({
    selector: "ripple-button",
    templateUrl: "./ripple-button.component.html",
    styleUrls: ["./ripple-button.component.scss"]
})
export class RippleButtonComponent implements OnInit {
    tag = this.constructor.name;

    @ViewChild('button', {static:true}) button : ElementRef;
    
    // when close button clicked
    @Output() click : EventEmitter<any> = new EventEmitter();

    @Input() text = "tap";
    @Input() backgroundColor = "#ddd";
    @Input() textColor = "white";
    @Input() width = 0;
    @Input() height = 0;
    @Input() margin = 0;


    constructor(private routerExtensions: RouterExtensions) {
        console.log(`${this.tag} constructor `)

    }

    ngOnInit(): void {
        console.log(`${this.tag} ngOnInit`);
        console.log(this.routerExtensions.router.url);

        let root = this.button.nativeElement as LayoutBase;

        console.log("text = ", this.text);
        console.log("textColor = ", this.textColor);
        console.log("backgroundColor = ", this.backgroundColor);
        console.log("width = ", this.width);
        console.log("height = ", this.height);
        console.log("margin = ", this.margin);

        // if(this.width == 0){
        //     root.width = 0;
        // }
        // if(this.height == 0){
        //     root.height = 0;
        // }
        root.backgroundColor = this.backgroundColor;
        
        // const isKnown = colors.isKnownName(this.textColor);
        // if (isKnown) {
        //     root.color = new Color(this.textColor);
        // }
        root.css = ".btn{color:" + this.textColor + ";}";
    }

    onClickTab(args: EventData) {
        console.log("tab!")
        this.click.emit();
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
    
            let d = Math.max(Number(btn.getMeasuredHeight()), Number(btn.getMeasuredWidth()));
    
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

    ngOnDestroy(){
        console.log(`${this.tag} ngOnDestroy`);
    }
}
