import { Component, ElementRef, OnInit, ViewChild, Output, EventEmitter, Input } from "@angular/core";

import { AnimationCurve } from "@nativescript/core/ui/enums";
import { screen } from "tns-core-modules/platform/platform"
import { LayoutBase, Image, Label } from "tns-core-modules";

@Component({
    selector: "carousel-card",
    templateUrl: "./carousel-card.component.html",
    styleUrls: ["./carousel-card.component.scss"]
})
export class CarouselCardComponent implements OnInit {
    tag = this.constructor.name;
    
    // carousel
    @ViewChild('scroll', { static: true }) scrollview: ElementRef;
    @ViewChild('scrollitems', { static: true }) scrollitems: ElementRef;
    @ViewChild('element', { static: true }) element: ElementRef;
    @ViewChild('shadow', {static:true}) shadow:ElementRef;
    @ViewChild('abs', {static:true}) abs:ElementRef;
    // cardlist = [
    //     "~/images/card_ezlink.png",
    //     "~/images/card_octopus.png",
    //     "~/images/card_oyster.png",
    //     "~/images/card_ezlink.png",
    // ];
    @Input('elem_list') cardlist;
    @Output() onTapElem : EventEmitter<any> = new EventEmitter();
    cards = [];
    card_view = [];
    card_index = 1;
    cards_loaded = false;

    // carousel style, scale settings
    cardwidth = 196;
    cardheight = 180;
    cardscale = 0.8;
    cardscaleup = 1.1;
    opacity = 0.35;
    opacityup = 1;
    margin_hori = 0;
    margin_ver = 36;
    shadowmargin = 0;

    // calced position
    origin_y = 0;
    scaleup_y = 0;

    scrollx = 0;
    prev_delta = 0;

    @ViewChild('indicator', { static: true }) indicator: ElementRef;
    indicator_view = [];

    constructor() {
        console.log(`${this.tag} constructor `)

    }

    ngOnInit(): void {
        console.log(`${this.tag} ngOnInit`);        
        
        // let sv = this.scrollview.nativeElement as ScrollView;
        let si = this.scrollitems.nativeElement as LayoutBase;
        let ind = this.indicator.nativeElement as LayoutBase;

        let p = screen.mainScreen.heightDIPs / screen.mainScreen.heightPixels;
        let middle_of_screen = screen.mainScreen.widthDIPs / 2
        let one_card_width = this.cardwidth + this.margin_hori * 2;
        let firstloc = middle_of_screen - one_card_width / 2;

        si.paddingLeft = firstloc;
        si.paddingRight = firstloc;

        setTimeout(() => {
            si.translateX = this.cards[this.card_index];
        });
    }

    
    onLoadedCard(event, index) {
        if(this.card_view.length >= this.cardlist.length){
            return;
        }
        if(this.cards_loaded == true){
            return;
        }
        let p = screen.mainScreen.heightDIPs / screen.mainScreen.heightPixels;
        let middle_of_screen = screen.mainScreen.widthDIPs / 2
        let one_card_width = this.cardwidth + this.margin_hori * 2;
        let firstloc = middle_of_screen - one_card_width / 2;

        let frame = event.object as LayoutBase;

        // frame.src = this.cardlist[index];
        frame.width = this.cardwidth;
        frame.marginLeft = this.margin_hori;
        frame.marginRight = this.margin_hori;
        frame.marginTop = this.margin_ver * 2;

        setTimeout(() => {
            if(this.shadowmargin === 0){
                let imgs : Image[] = [];
                frame.eachChild((view)=>{
                    if(view.typeName === "Image"){
                        imgs.push(view as Image);
                    }
                    return true;
                });
                this.shadowmargin = -(imgs[0].getMeasuredHeight() - imgs[1].getMeasuredHeight()) * p / 2;
                console.log("shadowmargin = " , this.shadowmargin * (this.cardscaleup - this.cardscale));
            }
            frame.translateY = this.shadowmargin * (this.cardscaleup - this.cardscale);
        });

        if (this.card_index === index) {
            frame.scaleX = this.cardscaleup;
            frame.scaleY = this.cardscaleup;

            // frame.on(ViewBase.loadedEvent, (load_data) => {
                setTimeout(() => {
                    const elementHeight = frame.getMeasuredHeight()
                    console.log("img.getMeasuredHeight() = ", elementHeight)
                    frame.translateY = -(elementHeight * (this.cardscaleup - this.cardscale) / 2 * p);

                    this.cardheight = this.card_view[this.card_index].getMeasuredHeight() * p;
                    console.log("card height = " + this.cardheight);
                })
            // })
        } else {
            frame.scaleX = this.cardscale;
            frame.scaleY = this.cardscale;
            frame.opacity = this.opacity;
        }
        frame.verticalAlignment = "bottom";
        // console.log("image count = " + index);
        this.cards.push(-(index * one_card_width));
        console.log("card offset = " + (-(index * one_card_width)));
        this.card_view.push(frame);

        console.log(index);
        console.log(frame);

        if (index == this.cardlist.length - 1) {
            let si = this.scrollitems.nativeElement as LayoutBase;
            console.log(si);
            si.translateX = this.cards[this.card_index];
        }
    }

    onLoadedIndicator(event, index){
        if(this.indicator_view.length >= this.cardlist.length){
            return;
        }
        let p = screen.mainScreen.heightDIPs / screen.mainScreen.heightPixels;
        let middle_of_screen = screen.mainScreen.widthDIPs / 2
        let one_card_width = this.cardwidth + this.margin_hori * 2;
        let firstloc = middle_of_screen - one_card_width / 2;

        let frame = event.object as Image;

        // indicators
        frame.width = 12;
        frame.height = 12;
        frame.marginLeft = 4;
        frame.marginRight = 4;
        frame.borderRadius = "50%";
        if (this.card_index === index) {
            frame.backgroundColor = "#ff5722";
        } else {
            frame.backgroundColor = "#cccccc";
        }
        this.indicator_view.push(frame);
        // ind.addChild(frame);

        // console.log(index);
        // console.log(frame);

        if (index == this.cardlist.length - 1) {
            setTimeout(() => {
                let ind = this.indicator.nativeElement as LayoutBase;
                // set indicators layout height
                ind.top = this.cardheight + 92;
                ind.left = (screen.mainScreen.widthDIPs - ind.getMeasuredWidth() * p) / 2;
            });
        }
    }

    onTapCard(event, index){
        console.log("tap card = " + index);
        if(this.card_index == index){
            this.onTapElem.emit(index);
        }
    }

    onPanCarousel(event) {
        let si = this.scrollitems.nativeElement as LayoutBase;

        let middle_of_screen = screen.mainScreen.widthDIPs / 2
        let one_card_width = this.cardwidth + this.margin_hori * 2;

        if (event.state === 1) // down
        {
            this.prev_delta = event.deltaX;
        }
        else if (event.state === 2) // panning
        {
            // moving the scroll
            si.translateX += (event.deltaX - this.prev_delta) / 2.5;
            let p = screen.mainScreen.heightDIPs / screen.mainScreen.heightPixels;

            if (si.translateX < this.cards[this.card_index]) {
                // right
                let rate = (this.cards[this.card_index] - si.translateX) / one_card_width;
                console.log("drag to the right, rate = ", rate);

                let thisview = this.card_view[this.card_index];
                let nextview = this.card_view[this.card_index + 1];
                if (nextview != undefined) {
                    nextview.scaleX = this.cardscale + (this.cardscaleup - this.cardscale) * rate;
                    nextview.scaleY = this.cardscale + (this.cardscaleup - this.cardscale) * rate;

                    nextview.opacity = this.opacity + (1 - this.opacity) * rate;

                    let temp_y = -(nextview.getMeasuredHeight() * (this.cardscaleup - this.cardscale) / 2 * p) ;

                    nextview.translateY = this.shadowmargin * (this.cardscaleup - this.cardscale) + temp_y * rate;
                }
                let temp_y = -(thisview.getMeasuredHeight() * (this.cardscaleup - this.cardscale) / 2 * p);

                thisview.scaleX = this.cardscale + (this.cardscaleup - this.cardscale) * (1 - rate);
                thisview.scaleY = this.cardscale + (this.cardscaleup - this.cardscale) * (1 - rate);

                thisview.opacity = this.opacity + (1 - this.opacity) * (1 - rate / 2);

                thisview.translateY = temp_y - (temp_y) * rate;
            } else if (si.translateX > this.cards[this.card_index]) {
                // left
                let rate = (si.translateX - this.cards[this.card_index]) / one_card_width;
                console.log("drag to the left, rate = ", rate);

                let thisview = this.card_view[this.card_index];
                let prevview = this.card_view[this.card_index - 1];
                if (prevview != undefined) {
                    prevview.scaleX = this.cardscale + (this.cardscaleup - this.cardscale) * rate;
                    prevview.scaleY = this.cardscale + (this.cardscaleup - this.cardscale) * rate;

                    prevview.opacity = this.opacity + (1 - this.opacity) * rate;

                    let temp_y = -(prevview.getMeasuredHeight() * (this.cardscaleup - this.cardscale) / 2 * p);

                    prevview.translateY = this.shadowmargin * (this.cardscaleup - this.cardscale) + temp_y * rate;
                }
                let temp_y = -(thisview.getMeasuredHeight() * (this.cardscaleup - this.cardscale) / 2 * p);

                thisview.scaleX = this.cardscale + (this.cardscaleup - this.cardscale) * (1 - rate / 2);
                thisview.scaleY = this.cardscale + (this.cardscaleup - this.cardscale) * (1 - rate / 2);

                thisview.opacity = this.opacity + (1 - this.opacity) * (1 - rate / 2);

                thisview.translateY = temp_y - (temp_y) * rate / 2;
            }

            this.prev_delta = event.deltaX;
        }
        else if (event.state === 3) // up
        {
            console.log("event.deltaX = " + event.deltaX);
            console.log("this.prev_delta = " + this.prev_delta);
            console.log("si.translateX = " + si.translateX);
            console.log("(this.cards[this.card_index] - one_card_width / 4) = " + (this.cards[this.card_index] - one_card_width / 4));
            console.log("(this.cards[this.card_index] + one_card_width / 4) = " + (this.cards[this.card_index] + one_card_width / 4));
            let p = screen.mainScreen.heightDIPs / screen.mainScreen.heightPixels;


            let animation_card_to_origin = {
                scale: { x: this.cardscale, y: this.cardscale },
                translate: { x: 0, y: this.shadowmargin * (this.cardscaleup - this.cardscale) },
                opacity: this.opacity,
                duration: 200,
                curve: AnimationCurve.easeOut
            };
            let animation_card_scale_up = {
                scale: { x: this.cardscaleup, y: this.cardscaleup },
                translate: { x: 0, y: -(this.card_view[this.card_index].getMeasuredHeight() * (this.cardscaleup - this.cardscale) / 2 * p) },
                opacity: 1,
                duration: 200,
                curve: AnimationCurve.easeOut
            };

            let animation_indicator_off = {
                backgroundColor: "#cccccc",
                duration: 200,
                curve: AnimationCurve.easeOut
            };
            let animation_indicator_on = {
                backgroundColor: "#ff5722",
                duration: 200,
                curve: AnimationCurve.easeOut
            };

            if (si.translateX < (this.cards[this.card_index] - one_card_width / 4) || this.prev_delta < 24) {
                // to the right
                console.log("to the right");

                if (this.card_index < this.cards.length - 1) {
                    // move
                    console.log("this.cards.length = " + this.cards.length);
                    animation_card_scale_up.translate = { x: 0, y: -(this.card_view[this.card_index + 1].getMeasuredHeight() * (this.cardscaleup - this.cardscale) / 2 * p) };
                    this.card_view[this.card_index].animate(animation_card_to_origin);
                    this.card_view[this.card_index + 1].animate(animation_card_scale_up);
                    this.indicator_view[this.card_index].animate(animation_indicator_off);
                    this.indicator_view[this.card_index + 1].animate(animation_indicator_on);
                    si.animate({
                        translate: { x: this.cards[this.card_index + 1], y: si.translateY },
                        duration: 200,
                        curve: AnimationCurve.easeOut
                    }).then(() => {
                        this.card_index = this.card_index + 1;
                        console.log("this card index = " + this.card_index);
                    });
                } else {
                    // not move, goto origin
                    this.card_view[this.card_index].animate(animation_card_scale_up);
                    si.animate({
                        translate: { x: this.cards[this.card_index], y: si.translateY },
                        duration: 200,
                        curve: AnimationCurve.easeOut
                    }).then(() => {
                        console.log("this card index = " + this.card_index);
                    });
                }
            } else if (si.translateX > (this.cards[this.card_index] + one_card_width / 4) || this.prev_delta > 24) {
                // to the left
                console.log("to the left");
                if (0 < this.card_index) {
                    // move
                    animation_card_scale_up.translate = { x: 0, y: -(this.card_view[this.card_index - 1].getMeasuredHeight() * (this.cardscaleup - this.cardscale) / 2 * p) };
                    this.card_view[this.card_index].animate(animation_card_to_origin);
                    this.card_view[this.card_index - 1].animate(animation_card_scale_up);
                    this.indicator_view[this.card_index].animate(animation_indicator_off);
                    this.indicator_view[this.card_index - 1].animate(animation_indicator_on);
                    si.animate({
                        translate: { x: this.cards[this.card_index - 1], y: si.translateY },
                        duration: 200,
                        curve: AnimationCurve.easeOut
                    }).then(() => {
                        this.card_index = this.card_index - 1;
                        console.log("this card index = " + this.card_index);
                    });
                } else {
                    // not move, go to origin
                    this.card_view[this.card_index].animate(animation_card_scale_up);
                    si.animate({
                        translate: { x: this.cards[this.card_index], y: si.translateY },
                        duration: 200,
                        curve: AnimationCurve.easeOut
                    }).then(() => {
                        console.log("this card index = " + this.card_index);
                    });
                }
            } else {
                if (this.card_view[this.card_index - 1] != undefined) {
                    this.card_view[this.card_index - 1].animate(animation_card_to_origin);
                }
                if (this.card_view[this.card_index + 1] != undefined) {
                    this.card_view[this.card_index + 1].animate(animation_card_to_origin);
                }
                this.card_view[this.card_index].animate(animation_card_scale_up);
                si.animate({
                    translate: { x: this.cards[this.card_index], y: si.translateY },
                    duration: 150,
                }).then(() => {
                    console.log("this card index = " + this.card_index);
                });
            }
        }
    }

    ngOnDestroy(){
        console.log(`${this.tag} ngOnDestroy`);
    }


}
