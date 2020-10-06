import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";

import { AnimationCurve } from "@nativescript/core/ui/enums";
import { RouterExtensions } from "@nativescript/angular";
import { LayoutBase, ScrollEventData, ScrollView, Image, Label } from "tns-core-modules";
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
    card_index = 0;

    cardwidth = 200;
    margin = 24;

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
        let one_card_width = this.cardwidth + this.margin * 2;
        let firstloc = middle_of_screen - one_card_width / 2;

        si.paddingLeft = firstloc;
        si.paddingRight = firstloc;

        for(let i = 0; i < cardlist.length; ++i){
            let img = new Image();
            img.src = cardlist[i];
            img.width = this.cardwidth;
            img.margin = this.margin;
            console.log("image count = " + i);
            this.cards.push(-(i * one_card_width));
            console.log("card offset = " + (-(i * one_card_width)));
            this.card_view.push(img);
            // img.left = this.margin + (i * this.margin * 2) + (i * this.cardwidth);
            si.addChild(img);
        }

        si.eachChild((view) => {
            let img = view as Image;
            console.log(img.getLocationOnScreen());
            console.log(img.getLocationInWindow());
            console.log(img.getLocationRelativeTo(si));

            this.cards.push(img.getLocationRelativeTo(si).x);
            return true;
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
        let one_card_width = this.cardwidth + this.margin * 2;

        if (event.state === 1) // down
        {
            this.prev_delta = event.deltaX;
        }
        else if (event.state === 2) // panning
        {
            console.log("event.deltaX = " + event.deltaX);
            
            si.translateX += (event.deltaX - this.prev_delta) / 2;
            this.prev_delta = event.deltaX;
        }
        else if (event.state === 3) // up
        {
            console.log("event.deltaX = " + event.deltaX);
            console.log("this.prev_delta = " + this.prev_delta);
            console.log("si.translateX = " + si.translateX);
            console.log("(this.cards[this.card_index] - one_card_width / 4) = " + (this.cards[this.card_index] - one_card_width / 4));
            console.log("(this.cards[this.card_index] + one_card_width / 4) = " + (this.cards[this.card_index] + one_card_width / 4));
            if(si.translateX < (this.cards[this.card_index] - one_card_width / 4)){
                // to the right
                console.log("to the right");
                if(this.card_index < this.cards.length - 1){
                    si.animate({
                        translate: {x:this.cards[this.card_index + 1], y:si.translateY},
                        duration: 150,
                    }).then(()=>{
                        this.card_index = this.card_index + 1;
                        console.log("this card index = " + this.card_index);
                    });
                }else {
                    si.animate({
                        translate: {x:this.cards[this.card_index], y:si.translateY},
                        duration: 150,
                    }).then(()=>{
                        console.log("this card index = " + this.card_index);
                    });
                }
            }else if(si.translateX > (this.cards[this.card_index] + one_card_width / 4)){
                // to the left
                console.log("to the left");
                if(0 < this.card_index){
                    si.animate({
                        translate: {x:this.cards[this.card_index - 1], y:si.translateY},
                        duration: 150,
                    }).then(()=>{
                        this.card_index = this.card_index - 1;
                        console.log("this card index = " + this.card_index);
                    });
                }else {
                    si.animate({
                        translate: {x:this.cards[this.card_index], y:si.translateY},
                        duration: 150,
                    }).then(()=>{
                        console.log("this card index = " + this.card_index);
                    });
                }
            }else{
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
