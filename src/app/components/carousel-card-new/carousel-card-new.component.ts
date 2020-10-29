import { Component, ElementRef, OnInit, ViewChild, Output, EventEmitter, Input } from "@angular/core";

import { AnimationCurve } from "@nativescript/core/ui/enums";
import { screen } from "tns-core-modules/platform/platform"
import { LayoutBase, Image, Label } from "tns-core-modules";

@Component({
    selector: "carousel-card-new",
    templateUrl: "./carousel-card-new.component.html",
    styleUrls: ["./carousel-card-new.component.scss"]
})
export class CarouselCardNewComponent implements OnInit {
    tag = this.constructor.name;


    // carousel
    @ViewChild('scrollitems', { static: true }) scrollitems: ElementRef;
    @ViewChild('element', { static: true }) element: ElementRef;
    @ViewChild('shadow', { static: true }) shadow: ElementRef;
    @ViewChild('absolute', { static: true }) absolute: ElementRef;
    // elemList = [
    //     "~/images/card_ezlink.png",
    //     "~/images/card_octopus.png",
    //     "~/images/card_oyster.png",
    //     "~/images/card_ezlink.png",
    // ];
    @Input('elemList') elemList;
    @Output('onSelect') onSelect: EventEmitter<any> = new EventEmitter();
    @Output() onTapElem: EventEmitter<any> = new EventEmitter();

    // {
    //     locationX : 0,
    //     view:undefined,
    // }
    frameElements = [];
    frameIndex = 1;
    cards_loaded = false;

    // carousel style, scale settings
    frame = {
        width: 196,
        height: 180,
    }
    frameScale = {
        small: 0.8,
        large: 1.1,
    }
    frameOpacity = {
        dim: 0.35,
        bright: 1,
    }
    frameMargin = {
        width: 8,
        height: 36,
    }
    shadowSize = 10;

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
        let si = this.scrollitems.nativeElement as LayoutBase;
        let ind = this.indicator.nativeElement as LayoutBase;

        let firstloc = (screen.mainScreen.widthDIPs - this.oneFrameWidth) / 2;

        si.paddingLeft = firstloc;
        si.paddingRight = firstloc;

        this.onSelect.emit(this.frameIndex);
    }

    get oneFrameWidth() {
        return this.frame.width;
    }
    get rateDPI() {
        return screen.mainScreen.heightDIPs / screen.mainScreen.heightPixels;
    }

    onLayoutChangedCard(event, index) {
        if (this.frameElements.length >= this.elemList.length) {
            return;
        }
        if (this.cards_loaded == true) {
            return;
        }
        let middle_of_screen = screen.mainScreen.widthDIPs / 2

        let frame = event.object as LayoutBase;

        frame.width = this.frame.width;
        frame.marginTop = this.frameMargin.height * 2;
        frame.marginBottom = this.frameMargin.height;
        frame.left = (this.frame.width + this.frameMargin.width * 2)* index + this.frameMargin.width + this.shadowSize + this.frame.width * (this.frameScale.large - 1);
        // console.log("this.frame.width * index", this.frame.width * index);
        // console.log("this.shadowSize * 2", this.shadowSize * 2);
        // console.log("this.frameMargin.width * 2", this.frameMargin.width * 2);
        // console.log("frame.left", frame.left);
        frame.verticalAlignment = "bottom";

        if (this.frameIndex === index) {
            frame.scaleX = this.frameScale.large;
            frame.scaleY = this.frameScale.large;

            setTimeout(() => {
                const elementHeight = frame.getMeasuredHeight()
                console.log("img.getMeasuredHeight() = ", elementHeight)
                frame.translateY = -(elementHeight * (this.frameScale.large - this.frameScale.small) / 2 * this.rateDPI);

                this.frame.height = this.frameElements[this.frameIndex].view.getMeasuredHeight() * this.rateDPI;
                console.log("card height = " + this.frame.height);
            })
        } else {
            frame.scaleX = this.frameScale.small;
            frame.scaleY = this.frameScale.small;
            frame.opacity = this.frameOpacity.dim;
        }

        let element = {
            locationX: -(frame.left),
            view: frame
        }
        this.frameElements.push(element);
        console.log("frame index = ", index);
        console.log("frame offset = ", element.locationX);
        console.log("frame view = ", element.view);

        // last frame
        if (index == this.elemList.length - 1) {
            let si = this.scrollitems.nativeElement as LayoutBase;
            console.log(si);
            si.translateX = this.frameElements[this.frameIndex].locationX;
            setTimeout(() => {
                si.width = si.getMeasuredWidth() + this.frameMargin.width;
            });
        }
    }

    onLoadedIndicator(event, index) {
        if (this.indicator_view.length >= this.elemList.length) {
            return;
        }
        let middle_of_screen = screen.mainScreen.widthDIPs / 2
        let firstloc = middle_of_screen - this.oneFrameWidth / 2;

        let frame = event.object as Image;

        // indicators
        frame.width = 12;
        frame.height = 12;
        frame.marginLeft = 4;
        frame.marginRight = 4;
        frame.borderRadius = "50%";
        if (this.frameIndex === index) {
            frame.backgroundColor = "#ff5722";
        } else {
            frame.backgroundColor = "#cccccc";
        }
        this.indicator_view.push(frame);
        // ind.addChild(frame);

        // console.log(index);
        // console.log(frame);

        if (index == this.elemList.length - 1) {
            setTimeout(() => {
                let ind = this.indicator.nativeElement as LayoutBase;
                // set indicators layout height
                ind.top = this.frame.height + 100;
                ind.left = (screen.mainScreen.widthDIPs - ind.getMeasuredWidth() * this.rateDPI) / 2;
            });
        }
    }

    onTapCard(event, index) {
        console.log("tap card = " + index);
        if (this.frameIndex == index) {
            this.onTapElem.emit(index);
        }
    }

    onPanCarousel(event) {
        let si = this.scrollitems.nativeElement as LayoutBase;

        let middle_of_screen = screen.mainScreen.widthDIPs / 2

        if (event.state === 1) // down
        {
            this.prev_delta = event.deltaX;
        }
        else if (event.state === 2) // panning
        {
            // moving the scroll
            si.translateX += (event.deltaX - this.prev_delta) / 2.5;

            if (si.translateX < this.frameElements[this.frameIndex].locationX) {
                // right
                let rate = (this.frameElements[this.frameIndex].locationX - si.translateX) / this.oneFrameWidth;
                console.log("drag to the right, rate = ", rate);

                let thisview = this.frameElements[this.frameIndex].view;
                if (this.frameElements[this.frameIndex + 1] != undefined) {
                    let nextview = this.frameElements[this.frameIndex + 1].view;
                    nextview.scaleX = this.frameScale.small + (this.frameScale.large - this.frameScale.small) * rate;
                    nextview.scaleY = this.frameScale.small + (this.frameScale.large - this.frameScale.small) * rate;

                    nextview.opacity = this.frameOpacity.dim + (1 - this.frameOpacity.dim) * rate;

                    let temp_y = -(nextview.getMeasuredHeight() * (this.frameScale.large - this.frameScale.small) / 2 * this.rateDPI);

                    nextview.translateY = this.shadowSize * (this.frameScale.large - this.frameScale.small) + temp_y * rate;
                }
                let temp_y = -(thisview.getMeasuredHeight() * (this.frameScale.large - this.frameScale.small) / 2 * this.rateDPI);

                thisview.scaleX = this.frameScale.small + (this.frameScale.large - this.frameScale.small) * (1 - rate);
                thisview.scaleY = this.frameScale.small + (this.frameScale.large - this.frameScale.small) * (1 - rate);

                thisview.opacity = this.frameOpacity.dim + (1 - this.frameOpacity.dim) * (1 - rate / 2);

                thisview.translateY = temp_y - (temp_y) * rate;
            } else if (si.translateX > this.frameElements[this.frameIndex].locationX) {
                // left
                let rate = (si.translateX - this.frameElements[this.frameIndex].locationX) / this.oneFrameWidth;
                console.log("drag to the left, rate = ", rate);

                let thisview = this.frameElements[this.frameIndex].view;
                if (this.frameElements[this.frameIndex - 1] != undefined) {
                    let prevview = this.frameElements[this.frameIndex - 1].view;
                    prevview.scaleX = this.frameScale.small + (this.frameScale.large - this.frameScale.small) * rate;
                    prevview.scaleY = this.frameScale.small + (this.frameScale.large - this.frameScale.small) * rate;

                    prevview.opacity = this.frameOpacity.dim + (1 - this.frameOpacity.dim) * rate;

                    let temp_y = -(prevview.getMeasuredHeight() * (this.frameScale.large - this.frameScale.small) / 2 * this.rateDPI);

                    prevview.translateY = this.shadowSize * (this.frameScale.large - this.frameScale.small) + temp_y * rate;
                }
                let temp_y = -(thisview.getMeasuredHeight() * (this.frameScale.large - this.frameScale.small) / 2 * this.rateDPI);

                thisview.scaleX = this.frameScale.small + (this.frameScale.large - this.frameScale.small) * (1 - rate / 2);
                thisview.scaleY = this.frameScale.small + (this.frameScale.large - this.frameScale.small) * (1 - rate / 2);

                thisview.opacity = this.frameOpacity.dim + (1 - this.frameOpacity.dim) * (1 - rate / 2);

                thisview.translateY = temp_y - (temp_y) * rate / 2;
            }

            this.prev_delta = event.deltaX;
        }
        else if (event.state === 3) // up
        {
            console.log("event.deltaX = " + event.deltaX);
            console.log("this.prev_delta = " + this.prev_delta);
            console.log("si.translateX = " + si.translateX);
            console.log("(this.frameElements[this.frameIndex].locationX - this.oneFrameWidth / 4) = " + (this.frameElements[this.frameIndex].locationX - this.oneFrameWidth / 4));
            console.log("(this.frameElements[this.frameIndex].locationX + this.oneFrameWidth / 4) = " + (this.frameElements[this.frameIndex].locationX + this.oneFrameWidth / 4));


            let animation_card_to_origin = {
                scale: { x: this.frameScale.small, y: this.frameScale.small },
                translate: { x: 0, y: this.shadowSize * (this.frameScale.large - this.frameScale.small) },
                opacity: this.frameOpacity.dim,
                duration: 200,
                curve: AnimationCurve.easeOut
            };
            let animation_card_scale_up = {
                scale: { x: this.frameScale.large, y: this.frameScale.large },
                translate: { x: 0, y: -(this.frameElements[this.frameIndex].view.getMeasuredHeight() * (this.frameScale.large - this.frameScale.small) / 2 * this.rateDPI) },
                opacity: this.frameOpacity.bright,
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

            if (si.translateX < (this.frameElements[this.frameIndex].locationX - this.oneFrameWidth / 4) || this.prev_delta < -24) {
                // to the right
                console.log("to the right");

                if (this.frameIndex < this.frameElements.length - 1) {
                    // move
                    console.log("this.cards.length = " + this.frameElements.length);
                    animation_card_scale_up.translate = { x: 0, y: -(this.frameElements[this.frameIndex + 1].view.getMeasuredHeight() * (this.frameScale.large - this.frameScale.small) / 2 * this.rateDPI) };
                    this.frameElements[this.frameIndex].view.animate(animation_card_to_origin);
                    this.frameElements[this.frameIndex + 1].view.animate(animation_card_scale_up);
                    this.indicator_view[this.frameIndex].animate(animation_indicator_off);
                    this.indicator_view[this.frameIndex + 1].animate(animation_indicator_on);
                    si.animate({
                        translate: { x: this.frameElements[this.frameIndex + 1].locationX, y: si.translateY },
                        duration: 200,
                        curve: AnimationCurve.easeOut
                    }).then(() => {
                        this.frameIndex = this.frameIndex + 1;
                        console.log("this card index = " + this.frameIndex);
                        this.onSelect.emit(this.frameIndex);
                    });
                } else {
                    // not move, goto origin
                    this.frameElements[this.frameIndex].view.animate(animation_card_scale_up);
                    si.animate({
                        translate: { x: this.frameElements[this.frameIndex].locationX, y: si.translateY },
                        duration: 200,
                        curve: AnimationCurve.easeOut
                    }).then(() => {
                        console.log("this card index = " + this.frameIndex);
                    });
                }
            } else if (si.translateX > (this.frameElements[this.frameIndex].locationX + this.oneFrameWidth / 4) || this.prev_delta > 24) {
                // to the left
                console.log("to the left");
                if (0 < this.frameIndex) {
                    // move
                    animation_card_scale_up.translate = { x: 0, y: -(this.frameElements[this.frameIndex - 1].view.getMeasuredHeight() * (this.frameScale.large - this.frameScale.small) / 2 * this.rateDPI) };
                    this.frameElements[this.frameIndex].view.animate(animation_card_to_origin);
                    this.frameElements[this.frameIndex - 1].view.animate(animation_card_scale_up);
                    this.indicator_view[this.frameIndex].animate(animation_indicator_off);
                    this.indicator_view[this.frameIndex - 1].animate(animation_indicator_on);
                    si.animate({
                        translate: { x: this.frameElements[this.frameIndex - 1].locationX, y: si.translateY },
                        duration: 200,
                        curve: AnimationCurve.easeOut
                    }).then(() => {
                        this.frameIndex = this.frameIndex - 1;
                        console.log("this card index = " + this.frameIndex);
                        this.onSelect.emit(this.frameIndex);
                    });
                } else {
                    // not move, go to origin
                    this.frameElements[this.frameIndex].view.animate(animation_card_scale_up);
                    si.animate({
                        translate: { x: this.frameElements[this.frameIndex].locationX, y: si.translateY },
                        duration: 200,
                        curve: AnimationCurve.easeOut
                    }).then(() => {
                        console.log("this card index = " + this.frameIndex);
                    });
                }
            } else {
                if (this.frameElements[this.frameIndex - 1].view != undefined) {
                    this.frameElements[this.frameIndex - 1].view.animate(animation_card_to_origin);
                }
                if (this.frameElements[this.frameIndex + 1].view != undefined) {
                    this.frameElements[this.frameIndex + 1].view.animate(animation_card_to_origin);
                }
                this.frameElements[this.frameIndex].view.animate(animation_card_scale_up);
                si.animate({
                    translate: { x: this.frameElements[this.frameIndex].locationX, y: si.translateY },
                    duration: 150,
                }).then(() => {
                    console.log("this card index = " + this.frameIndex);
                });
            }
        }
    }



    ngOnDestroy() {
        console.log(`${this.tag} ngOnDestroy`);
    }


}
