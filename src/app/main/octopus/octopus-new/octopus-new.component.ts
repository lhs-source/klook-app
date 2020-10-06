import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";

import { AnimationCurve } from "@nativescript/core/ui/enums";
import { RouterExtensions } from "@nativescript/angular";
import { LayoutBase, ScrollEventData, ScrollView, Image, Label, ViewBase } from "tns-core-modules";
import { screen } from "tns-core-modules/platform/platform"

@Component({
    selector: "octopus-new",
    templateUrl: "./octopus-new.component.html",
    styleUrls:["./octopus-new.component.scss"]
})
export class OctopusNewComponent implements OnInit {
    tag = this.constructor.name;
    @ViewChild('scroll', {static:true}) scrollview : ElementRef;
    @ViewChild('scroll_items', {static:true}) scrollitems : ElementRef;
    cards=[];
    card_view=[];
    card_index = 1;

    cardwidth = 200;
    cardscale = 0.8;
    cardscaleup = 1.1;
    opacity = 0.7;
    opacityup = 1;
    margin_hori = 16;
    margin_ver = 36;

    scrollx = 0;
    prev_delta = 0;

    constructor(private routerExtensions : RouterExtensions) {
        console.log(`${this.tag} constructor `)
    }

    ngOnInit(): void {
        console.log(`${this.tag} ngOnInit`);
        console.log(this.routerExtensions.router.url);

        let cardlist = [
            "~/images/card_ezlink.png",
            "~/images/card_oyster.png",
            "~/images/card_octopus.png"
        ];
        // let cardoffset = 0;

        // let sv = this.scrollview.nativeElement as ScrollView;
        let si = this.scrollitems.nativeElement as LayoutBase;

        let middle_of_screen = screen.mainScreen.widthDIPs / 2
        let one_card_width = this.cardwidth + this.margin_hori * 2;
        let firstloc = middle_of_screen - one_card_width / 2;

        si.paddingLeft = firstloc;
        si.paddingRight = firstloc;

        for(let i = 0; i < cardlist.length; ++i){
            let img = new Image();
            img.src = cardlist[i];
            img.width = this.cardwidth;
            img.marginLeft = this.margin_hori;
            img.marginRight = this.margin_hori;
            img.marginTop = this.margin_ver * 2;
            // img.marginBottom = this.margin_ver;
            if(this.card_index === i){
                let p = screen.mainScreen.heightDIPs / screen.mainScreen.heightPixels;
                img.scaleX = this.cardscaleup;
                img.scaleY = this.cardscaleup;

                img.on(ViewBase.loadedEvent, (load_data) =>{
                    setTimeout(() => {
                        const elementHeight = img.getMeasuredHeight()
                        console.log("img.getMeasuredHeight() = ", elementHeight)
                        img.translateY = -(elementHeight * (this.cardscaleup - this.cardscale) / 2 * p);
                    })
                })
            }else{
                img.scaleX = this.cardscale;
                img.scaleY = this.cardscale;
                img.opacity = this.opacity;
            }
            img.verticalAlignment = "bottom";
            console.log("image count = " + i);
            this.cards.push(-(i * one_card_width));
            console.log("card offset = " + (-(i * one_card_width)));
            this.card_view.push(img);
            // img.left = this.margin + (i * this.margin * 2) + (i * this.cardwidth);
            si.addChild(img);
        }
        
        setTimeout(() => {
            si.translateX = this.cards[this.card_index];
        });
    }
    
    onScroll(args: ScrollEventData){
        let sv = this.scrollview.nativeElement as ScrollView;
        let si = this.scrollitems.nativeElement as LayoutBase;

        // let middle_of_screen = screen.mainScreen.widthDIPs / 2
        // let one_card_width = this.cardwidth + this.margin * 2;
        // let firstloc = middle_of_screen - one_card_width / 2;
        // si.eachChild((view) => {
        //     let img = view as Image;
        //     // console.log(img.getLocationRelativeTo(si).x - firstloc);
        //     return true;
        // });

        // let prev_middle = 0;
        // let next_middle = this.cards[this.cards.length];
        // if(this.card_index == 0){
        //     next_middle = this.cards[(this.card_index + 1)];
        // }else if(this.card_index >= this.cards.length){
        //     prev_middle = this.cards[(this.card_index - 1)];
        // }else{
        //     prev_middle = this.cards[(this.card_index - 1)];
        //     next_middle = this.cards[(this.card_index + 1)];
        // }
        // console.log("args.scrollX = " + args.scrollX + " prev_middle = " + prev_middle + " next_middle = " + next_middle);

        // // console.log("scrollX: " + args.scrollX);
        this.scrollx = args.scrollX;

        // if(args.scrollX < (this.cards[this.card_index] - prev_middle) / 2){
        //     // left of current index
        //     this.card_index = this.card_index - 1;
        //     console.log("change card index = " + this.card_index);

        // }else if(args.scrollX > (next_middle - this.cards[this.card_index] + this.cards[this.card_index]) / 2){
        //     // right of current index
        //     this.card_index = this.card_index + 1;
        //     console.log("change card index = " + this.card_index);
        // }

        // if(args.eventName){

        // }
    }

    onPanCarousel(event){
        let si = this.scrollitems.nativeElement as LayoutBase;
        
        let middle_of_screen = screen.mainScreen.widthDIPs / 2
        let one_card_width = this.cardwidth + this.margin_hori * 2;

        if (event.state === 1) // down
        {
            // this.card_view[this.card_index].animate({
            //     scale:{x:this.cardscale, y:this.cardscale},
            //     translate:{x:0, y: 0},
            //     opacity:0.8,
            //     duration: 200,
            //     curve: AnimationCurve.easeOut
            // });
            this.prev_delta = event.deltaX;
        }
        else if (event.state === 2) // panning
        {
            // console.log("event.deltaX = " + event.deltaX);
            
            si.translateX += (event.deltaX - this.prev_delta) / 2.5;
            let p = screen.mainScreen.heightDIPs / screen.mainScreen.heightPixels;
            
            if(si.translateX < this.cards[this.card_index]){
                // right
                let rate = (this.cards[this.card_index] - si.translateX) / one_card_width;
                console.log("drag to the right");
                console.log("drag rate = ", rate);

                let thisview = this.card_view[this.card_index];
                let nextview = this.card_view[this.card_index + 1];
                if(nextview != undefined){
                    nextview.scaleX = this.cardscale + (this.cardscaleup - this.cardscale) * rate;
                    nextview.scaleY = this.cardscale + (this.cardscaleup - this.cardscale) * rate;
                    
                    nextview.opacity = this.opacity + (1 - this.opacity) * rate;

                    let temp_y = -(nextview.getMeasuredHeight() * (this.cardscaleup - this.cardscale) / 2 * p);
                    
                    nextview.translateY = 0 + temp_y * rate;
                }
                let temp_y = -(thisview.getMeasuredHeight() * (this.cardscaleup - this.cardscale) / 2 * p);
                
                thisview.scaleX = this.cardscale + (this.cardscaleup - this.cardscale) * (1 - rate);
                thisview.scaleY = this.cardscale + (this.cardscaleup - this.cardscale) * (1 - rate);
                
                thisview.opacity = this.opacity + (1 - this.opacity) * (1 - rate / 2);

                thisview.translateY = temp_y - (temp_y) * rate;
            }else if(si.translateX > this.cards[this.card_index]){
                // left
                let rate = (si.translateX - this.cards[this.card_index]) / one_card_width;
                console.log("drag to the left");
                console.log("drag rate = ", rate);

                let thisview = this.card_view[this.card_index];
                let prevview = this.card_view[this.card_index - 1];
                if(prevview != undefined){
                    prevview.scaleX = this.cardscale + (this.cardscaleup - this.cardscale) * rate;
                    prevview.scaleY = this.cardscale + (this.cardscaleup - this.cardscale) * rate;
                    
                    prevview.opacity = this.opacity + (1 - this.opacity) * rate;

                    let temp_y = -(prevview.getMeasuredHeight() * (this.cardscaleup - this.cardscale) / 2 * p);

                    prevview.translateY = 0 + temp_y * rate;
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


            if(si.translateX < (this.cards[this.card_index] - one_card_width / 4)){
                // to the right
                console.log("to the right");
                
                if(this.card_index < this.cards.length - 1){
                    this.card_view[this.card_index].animate({
                        scale:{x:this.cardscale, y:this.cardscale},
                        translate:{x:0, y: 0},
                        opacity:this.opacity,
                        duration: 200,
                        curve: AnimationCurve.easeOut
                    });
                    this.card_view[this.card_index + 1].animate({
                        scale:{x:this.cardscaleup, y:this.cardscaleup},
                        translate:{x:0, y: -(this.card_view[this.card_index + 1].getMeasuredHeight() * (this.cardscaleup - this.cardscale) / 2 * p)},
                        opacity:1,
                        duration: 200,
                        curve: AnimationCurve.easeOut
                    });
                    si.animate({
                        translate: {x:this.cards[this.card_index + 1], y:si.translateY},
                        duration: 200,
                        curve: AnimationCurve.easeOut
                    }).then(()=>{
                        this.card_index = this.card_index + 1;
                        console.log("this card index = " + this.card_index);
                    });
                }else {
                    this.card_view[this.card_index].animate({
                        scale:{x:this.cardscaleup, y:this.cardscaleup},
                        translate:{x:0, y: -(this.card_view[this.card_index].getMeasuredHeight() * (this.cardscaleup - this.cardscale) / 2 * p)},
                        opacity:1,
                        duration: 200,
                        curve: AnimationCurve.easeOut
                    });
                    si.animate({
                        translate: {x:this.cards[this.card_index], y:si.translateY},
                        duration: 200,
                        curve: AnimationCurve.easeOut
                    }).then(()=>{
                        console.log("this card index = " + this.card_index);
                    });
                }
            }else if(si.translateX > (this.cards[this.card_index] + one_card_width / 4)){
                // to the left
                console.log("to the left");
                if(0 < this.card_index){
                    this.card_view[this.card_index].animate({
                        scale:{x:this.cardscale, y:this.cardscale},
                        translate:{x:0, y: 0},
                        opacity:this.opacity,
                        duration: 200,
                        curve: AnimationCurve.easeOut
                    });
                    this.card_view[this.card_index - 1].animate({
                        scale:{x:this.cardscaleup, y:this.cardscaleup},
                        translate:{x:0, y: -(this.card_view[this.card_index - 1].getMeasuredHeight() * (this.cardscaleup - this.cardscale) / 2 * p)},
                        opacity:1,
                        duration: 200,
                        curve: AnimationCurve.easeOut
                    });
                    si.animate({
                        translate: {x:this.cards[this.card_index - 1], y:si.translateY},
                        duration: 200,
                        curve: AnimationCurve.easeOut
                    }).then(()=>{
                        this.card_index = this.card_index - 1;
                        console.log("this card index = " + this.card_index);
                    });
                }else {
                    this.card_view[this.card_index].animate({
                        scale:{x:this.cardscaleup, y:this.cardscaleup},
                        translate:{x:0, y: -(this.card_view[this.card_index].getMeasuredHeight() * (this.cardscaleup - this.cardscale) / 2 * p)},
                        opacity:1,
                        duration: 200,
                        curve: AnimationCurve.easeOut
                    });
                    si.animate({
                        translate: {x:this.cards[this.card_index], y:si.translateY},
                        duration: 200,
                        curve: AnimationCurve.easeOut
                    }).then(()=>{
                        console.log("this card index = " + this.card_index);
                    });
                }
            }else{
                if(this.card_view[this.card_index - 1] != undefined){
                    this.card_view[this.card_index - 1].animate({
                        scale:{x:this.cardscale, y:this.cardscale},
                        translate:{x:0, y: 0},
                        opacity:0.8,
                        duration: 200,
                        curve: AnimationCurve.easeOut
                    });
                }
                if(this.card_view[this.card_index + 1] != undefined){
                    this.card_view[this.card_index + 1].animate({
                        scale:{x:this.cardscale, y:this.cardscale},
                        translate:{x:0, y: 0},
                        opacity:0.8,
                        duration: 200,
                        curve: AnimationCurve.easeOut
                    });
                }
                this.card_view[this.card_index].animate({
                    scale:{x:this.cardscaleup, y:this.cardscaleup},
                    translate:{x:0, y: -(this.card_view[this.card_index].getMeasuredHeight() * (this.cardscaleup - this.cardscale) / 2 * p)},
                    opacity:1,
                    duration: 200,
                    curve: AnimationCurve.easeOut
                });
                si.animate({
                    translate: {x:this.cards[this.card_index], y:si.translateY},
                    duration: 150,
                }).then(()=>{
                    console.log("this card index = " + this.card_index);
                });
            }
        }
    }
    
    scrolltest(num){
        let sv = this.scrollview.nativeElement as ScrollView;
        let si = this.scrollitems.nativeElement as LayoutBase;
        
        sv.scrollToHorizontalOffset(this.cards[num - 1], true);
        // console.log("offset1: " + sv.horizontalOffset);


        // console.log(sv.scrollableWidth);
        // console.log(screen.mainScreen.widthDIPs);
        // sv.scrollToHorizontalOffset(
        //     this.cardwidth + this.margin * 2 + 
        //     num * (this.cardwidth + this.margin * 2) 
        //     - this.cardwidth / 2 - this.margin - screen.mainScreen.widthDIPs / 2, true);
    }
    onLoadedScroll(event){
        console.log(this.tag + " onLoadedScroll");
        // sv.scrollToHorizontalOffset(firstloc, false);
    }
    onLoadedScrollLayout(event){
        console.log(this.tag + " onLoadedScrollLayout");
        let si = this.scrollitems.nativeElement as LayoutBase;
    }
    
    ngAfterViewInit():void{
        console.log(this.tag + " ngAfterViewInit");
        let si = this.scrollitems.nativeElement as LayoutBase;
    }

    navigateBack(event) {
        console.log(this.tag + " navigateChargePoint");
        if(this.routerExtensions.canGoBack()){
            this.routerExtensions.back();
        }else{
            this.routerExtensions.navigate(['/main/octopus/main'], { transition: { name: 'fade', duration: 350, curve: AnimationCurve.easeOut } });
        }
    }
}
