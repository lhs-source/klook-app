import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { AnimationCurve } from "@nativescript/core/ui/enums";
import { ActivatedRoute } from "@angular/router";
import { isAndroid, Application, AndroidApplication, AndroidActivityBackPressedEventData, LayoutBase, Color, TextField } from "tns-core-modules";
import * as app from "tns-core-modules/application";

import { screen } from "tns-core-modules/platform/platform"

import { CustomTransitionBack } from "../home/klook-transition";


@Component({
    selector: "charge-point",
    templateUrl: "./charge-point.component.html",
    styleUrls:["./charge-point.component.scss"]
})
export class ChargePointComponent implements OnInit {
    tag = this.constructor.name;

    title = "포인트 충전 > 일반충전";
    isNormal = true;

    selected_way = {
        isCard:true,
        img:"~/images/img_kbcard.png",
        title:"KB국민카드 해피nori",
        number:"9445-****-****-****",
        balance: 1800000,
    };

    // prepared data
    cards=[
        {
            img:"~/images/img_kbcard.png",
            title:"KB국민카드 해피nori",
            number:"9445-****-****-****",
            balance: 1800000,
        }
    ];
    banks=[
        {
            img:"~/images/ico_kbcard_small.png",
            title:"국민은행",
            number:"1002-**-***031",
            balance: 3600000,
        },
        {
            img:"~/images/ico_shcard_small.png",
            title:"신한은행",
            number:"3123-**-****932",
            balance: 2400000,
        }
    ]

    // modal
    @ViewChild('modalframe', {static:true}) modalframe : ElementRef;
    @ViewChild('modal', {static:true}) modal : ElementRef;
    isModalShow=false;

    @ViewChild('modalkeypad', {static:true}) modalkeypad : ElementRef;
    @ViewChild('amounttf', {static:true}) amounttf : ElementRef;
    isKeypadShow= false;
    amount = '';
    cursor = 0;

    constructor(private routerExtensions : RouterExtensions, private activatedRoute : ActivatedRoute) {
        console.log(`${this.tag} constructor `)
        if(isAndroid){
            Application.android.off(AndroidApplication.activityBackPressedEvent);
            Application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
                console.log("back button pressed on " + this.tag);
                data.cancel = true;
                this.routerExtensions.navigate(['/main/home'], {transition:{instance : new CustomTransitionBack(250, AnimationCurve.linear)}, clearHistory : true});
            });

            // prevent the soft keyboard from showing initially when textfields are present
            app.android.startActivity.getWindow().setSoftInputMode(
            android.view.WindowManager.LayoutParams.SOFT_INPUT_ADJUST_PAN);
        }
    }

    ngOnInit(): void {
        console.log(`${this.tag} ngOnInit`);
        console.log(this.routerExtensions.router.url);

        
        let modal = this.modal.nativeElement as LayoutBase;
        modal.on('loaded', (a)=>{
            let p = screen.mainScreen.heightDIPs / screen.mainScreen.heightPixels;
            setTimeout(() => {
                let height = modal.getMeasuredHeight() * p;
                console.log("height =",height);
                modal.animate({
                    translate:{x:modal.translateX, y:height},
                    duration:250,
                })
            });
        });
        let kl = this.modalkeypad.nativeElement as LayoutBase;
        kl.on('loaded', (a)=>{
            let p = screen.mainScreen.heightDIPs / screen.mainScreen.heightPixels;
            setTimeout(() => {
                let height = kl.getMeasuredHeight() * p;
                console.log("height =",height);
                kl.animate({
                    translate:{x:kl.translateX, y:height},
                    duration:250,
                })
            });
        });
    }

    onTapBack(){
        console.log("tap frame");
        let kl = this.modalkeypad.nativeElement as LayoutBase;
        let modal = this.modal.nativeElement as LayoutBase;
        this.modal_hide(modal, this.isModalShow, ()=>{this.isModalShow = false});
        this.modal_hide(kl, this.isKeypadShow, ()=>{this.isKeypadShow = false});
    }

    callback_tapTab(index){
        console.log(this.tag, "callback_tapTab =", index);
        if(index == 0){
            this.title = "포인트 충전 > 일반충전";
            this.isNormal = true;
        }else {
            this.title = "포인트 충전 > 자동충전";
            this.isNormal = false;
        }
    }

    onTapModalframe(){
        console.log(this.tag, "onTapModalframe");
    }

    modal_show(target : LayoutBase, flag : Boolean, afterrun:Function){        
        if(flag === false){
            let modalframe = this.modalframe.nativeElement as LayoutBase;
            let p = screen.mainScreen.heightDIPs / screen.mainScreen.heightPixels;
            let height = target.getMeasuredHeight() * p;

            modalframe.animate({
                backgroundColor:new Color(128, 48, 48, 48),
                duration:250,
            });

            target.animate({
                translate:{x:target.translateX, y:0},
                duration:250,
            }).then(()=>{
                afterrun();
            });
        }
    }
    modal_hide(target : LayoutBase, flag : Boolean, afterrun: Function){        
        if(flag === true){
            let modalframe = this.modalframe.nativeElement as LayoutBase;
            let p = screen.mainScreen.heightDIPs / screen.mainScreen.heightPixels;
            let height = target.getMeasuredHeight() * p;

            modalframe.animate({
                backgroundColor:new Color(0, 0, 0, 0),
                duration:250,
            });

            target.animate({
                translate:{x:target.translateX, y:height},
                duration:250,
            }).then(()=>{
                afterrun();
            })
        }
    }

    // keypad //
    onTapTextfield(event){
        console.log("onTapTextfield");
        let kf = event.object as TextField;
        let kl = this.modalkeypad.nativeElement as LayoutBase;
        kf.dismissSoftInput();
        this.modal_show(kl, this.isKeypadShow, ()=>{
            this.isKeypadShow = true;
        });
    }
    onChangeTextField(event){
        let kf = event.object as TextField;
        kf.android.setSelection(this.cursor);
    }
    callback_tapNumber(num){
        console.log(this.tag, "callback_tapNumber =", num);
        let kf = this.amounttf.nativeElement as TextField;
        let sel = kf.android.getSelectionStart();
        if(num == 'enter'){
            let kl = this.modalkeypad.nativeElement as LayoutBase;
            this.modal_hide(kl, this.isKeypadShow, ()=>{
                this.isKeypadShow = false;
            });
        }else if(num == 'back'){
            if(this.amount.length <= 0){

            }
            else if(sel === this.amount.length){
                this.amount = this.amount.slice(0, this.amount.length - 1);
                this.cursor = sel - 1;
            }else{
                let front = this.amount.slice(0, sel - 1);
                let back = this.amount.slice(sel, this.amount.length);
                this.amount = front + back;
                this.cursor = sel - 1;
            }
        }else if(num=='-1'){}
        else{
            if(this.amount.length > 20){}
            else if(sel === this.amount.length){
                this.amount = this.amount + String(num);
                this.cursor = sel + 1;
            }else{
                let front = this.amount.slice(0, sel);
                let back = this.amount.slice(sel, this.amount.length);
                front = front + String(num);
                this.amount = front + back;
                this.cursor = sel + 1;
            }
        }
        console.log(this.amount);
    }

    // lists //
    onTapWay(){
        console.log("onTapWay");
        // show or hide modal
        let frame = this.modalframe.nativeElement as LayoutBase;
        let modal = this.modal.nativeElement as LayoutBase;

        this.modal_show(modal, this.isModalShow, ()=>{this.isModalShow = true});
    }

    onTapCard(card){
        // console.log(this.tag, "card =", card);

        let frame = this.modalframe.nativeElement as LayoutBase;
        let modal = this.modal.nativeElement as LayoutBase;
        frame.animate({
            backgroundColor:new Color(0, 0, 0, 0),
            duration:250,
        });

        let p = screen.mainScreen.heightDIPs / screen.mainScreen.heightPixels;
        let height = modal.getMeasuredHeight() * p;

        modal.animate({
            translate:{x:modal.translateX, y:height},
            duration:250,
        }).then(()=>{
            
            this.selected_way.isCard = true;
            this.selected_way.img = card.img;
            this.selected_way.title = card.title;
            this.selected_way.number = card.number;
            this.selected_way.balance = card.balance;
            
            this.isModalShow = false;
        })
    }

    onTapBank(bank){
        // console.log(this.tag, "bank =", bank);
        
        let frame = this.modalframe.nativeElement as LayoutBase;
        let modal = this.modal.nativeElement as LayoutBase;
        frame.animate({
            backgroundColor:new Color(0, 0, 0, 0),
            duration:250,
        });

        let p = screen.mainScreen.heightDIPs / screen.mainScreen.heightPixels;
        let height = modal.getMeasuredHeight() * p;

        modal.animate({
            translate:{x:modal.translateX, y:height},
            duration:250,
        }).then(()=>{
            
            this.selected_way.isCard = false;
            this.selected_way.img = bank.img;
            this.selected_way.title = bank.title;
            this.selected_way.number = bank.number;
            this.selected_way.balance = bank.balance;

            this.isModalShow = false;
        });
    }

    navigateBack(event) {
        console.log(`${this.tag} navigateBack`);
        if(this.routerExtensions.canGoBack()){
            this.routerExtensions.back({relativeTo: this.activatedRoute});
        }else{
            this.routerExtensions.navigate(['/main/home'], { transition: { instance : new CustomTransitionBack(250, AnimationCurve.linear) }, clearHistory : true });
        }
    }
}
