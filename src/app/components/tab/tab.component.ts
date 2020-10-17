import { Component, ElementRef, OnInit, ViewChild, Output, EventEmitter, Input } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { LayoutBase, View, Color, EventData, Label } from "tns-core-modules";
import { screen } from "tns-core-modules/platform";
import { CubicBezierAnimationCurve } from "@nativescript/core/ui/animation";

import { animate, JsAnimationDefinition } from "./animation-helpers";


// <tab row="4" [tab_labels]="['최신순', '고액순', '충전/교환', '적립']" (tapElem)="callback_tab_tap($event)"></tab>
@Component({
    selector: "tab",
    templateUrl: "./tab.component.html",
    styleUrls: ["./tab.component.scss"]
})
export class TabComponent implements OnInit {
    tag = this.constructor.name;
    @Input() tab_labels = [];
    @Output('tapElem') tapElem : EventEmitter<any> = new EventEmitter();

    // tab
    @ViewChild('tab', { static: true }) tab: ElementRef;
    tab_view = [];
    selected = 0;
    
    temp_color = new Color("black");
    origin_color = new Color("#888");

    constructor(private routerExtensions: RouterExtensions) {
        console.log(`${this.tag} constructor `)

    }

    ngOnInit(): void {
        console.log(`${this.tag} ngOnInit`);
        console.log(this.routerExtensions.router.url);

    }

    onLoadedTab(event){
        if(this.tab_view.length >= this.tab_labels.length){
            // avoid multiple call
            return;
        }
        let lb = this.tab.nativeElement as LayoutBase;
        let toggle = lb.parentNode.getViewById("selected") as View;
        let p = screen.mainScreen.heightDIPs / screen.mainScreen.heightPixels;

        let label = event.object as Label;
        // console.log(label);
            
        this.tab_view.push(label);

        // first sel elems
        if (this.tab_view.length === 1) {
            // console.log("first label");
            let color_anim: JsAnimationDefinition = {
                curve: t => t,
                getRange: () => { return { from: label.color.r, to: this.temp_color.r }; },
                step: (v) => label.color = new Color(255, v, v, v)
            };
            animate(250, [color_anim]);

            setTimeout(() => {
                let loc = label.getLocationRelativeTo(lb);
                let width = label.getMeasuredWidth();
                // console.log(loc);
                // console.log(width * p);
                if(width == 0){
                    width=65;
                }else{
                    width = width * p;
                }
                toggle.animate({
                    translate: { x: 0, y: 0 },
                    width:width,
                    duration: 250,
                    curve: new CubicBezierAnimationCurve(0.6, 0.72, 0, 1)
                });
                this.selected = 0;
            });
        }
    }

    onTapTab(event, index){
        let lb = this.tab.nativeElement as LayoutBase;
        let toggle = lb.parentNode.getViewById("selected") as View;
        let p = screen.mainScreen.heightDIPs / screen.mainScreen.heightPixels;
            
        let label = event.object as Label;

        let loc = label.getLocationRelativeTo(lb);
        // console.log(loc);
        let width = label.getMeasuredWidth();

        if(this.selected == index){
            // if this view is already selected
            return;
        }
        // v = variation
        // step: (v) => label.color = new Color(255, v, v, v)
        let color_anim: JsAnimationDefinition = {
            curve: t => t,
            getRange: () => { return { from: label.color.r, to: this.temp_color.r }; },
            step: (v) => label.color = new Color(255, v, v, v)
        };
        animate(250, [color_anim]);
        this.tab_view.forEach((t) => {
            if (t !== label) {
                let color_anim: JsAnimationDefinition = {
                    curve: t => t,
                    getRange: () => { return { from: t.color.r, to: this.origin_color.r }; },
                    step: (v) => t.color = new Color(255, v, v, v)
                };
                animate(250, [color_anim]);
            }
        });
        toggle.animate({
            translate: { x: loc.x, y: 0 },
            width: width * p,
            duration: 250,
            curve: new CubicBezierAnimationCurve(0.6, 0.72, 0, 1)
        }).then(()=>{
            this.selected = index;
            this.tapElem.emit(index);
        });
    }

    ngOnDestroy(){
        console.log(`${this.tag} ngOnDestroy`);
    }
}
