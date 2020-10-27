import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { AnimationCurve } from "@nativescript/core/ui/enums";
import { ActivatedRoute } from "@angular/router";
import { isAndroid, Application, AndroidApplication, AndroidActivityBackPressedEventData, LayoutBase, Color, TextField, TouchGestureEventData } from "tns-core-modules";
import * as app from "tns-core-modules/application";
import * as utils from "tns-core-modules/utils/utils";

import { screen } from "tns-core-modules/platform/platform"
import { alert } from "tns-core-modules/ui/dialogs";

import { CustomTransitionBack } from "../../util/klook-transition";
import { DataService } from "../../service/data.service";
import { TransactionService } from "../../service/transaction.service";


@Component({
    selector: "charge-point",
    templateUrl: "./charge-point.component.html",
    styleUrls:["./charge-point.component.scss"]
})
export class ChargePointComponent implements OnInit {
    tag = this.constructor.name;

    title = "포인트 충전 > 일반충전";
    isNormal = true;
    isCard = true;

    // selected_way = {
    //     isCard:true,
    //     img:"~/images/img_kbcard.png",
    //     title:"KB국민카드 해피nori",
    //     number:"9445-****-****-****",
    //     balance: 1800000,
    // };


    // modal
    @ViewChild('modalframe', {static:true}) modalframe : ElementRef;
    @ViewChild('modal', {static:true}) modal : ElementRef;
    isModalShow=false;

    @ViewChild('modalkeypad', {static:true}) modalkeypad : ElementRef;

    @ViewChild('amounttf', {static:true}) amounttf : ElementRef;
    isKeypadShow= false;
    amount = '';
    amount_num = 0;
    cursor = 0;
    
    @ViewChild('amounttf_autounder', {static:true}) amounttf_autounder : ElementRef;
    @ViewChild('amounttf_auto', {static:true}) amounttf_auto : ElementRef;
    tf1 : TextField;
    tf2 : TextField;
    focused_tf : TextField;
    amount_auto_under = '';
    cursor_auto_under = 0;
    amount_auto = '';
    cursor_auto = 0;
    isUnder = true;


    constructor(private routerExtensions : RouterExtensions, 
        private activatedRoute : ActivatedRoute, 
        private dataService: DataService,
        private transactionService : TransactionService) {
        console.log(`${this.tag} constructor `)
        if(isAndroid){
            Application.android.off(AndroidApplication.activityBackPressedEvent);
            Application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
                console.log("back button pressed on " + this.tag);
                data.cancel = true;
                if(this.isKeypadShow || this.isModalShow){
                    this.onTapBack();
                }else{
                    this.routerExtensions.navigate(['/main/home'], {transition:{instance : new CustomTransitionBack(250, AnimationCurve.linear)}, clearHistory : true});
                }
            });

            // prevent the soft keyboard from showing initially when textfields are present
            app.android.startActivity.getWindow().setSoftInputMode(
            android.view.WindowManager.LayoutParams.SOFT_INPUT_ADJUST_PAN);
            app.android.startActivity.getWindow().setSoftInputMode(android.view.WindowManager.LayoutParams.SOFT_INPUT_STATE_ALWAYS_HIDDEN);

            utils.ad.dismissSoftInput();
        }
    }

    ngOnInit(): void {
        console.log(`${this.tag} ngOnInit`);
        console.log(this.routerExtensions.router.url);

        
        let modal = this.modal.nativeElement as LayoutBase;
        console.log(modal);
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
        console.log(kl);
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

        // let tf = this.amounttf.nativeElement as TextField;
        // tf.dismissSoftInput();
        // tf.android.setTextIsSelectable(true);
        // tf.android.setFocusable(false);
        // tf.android.setFocusableInTouchMode(true);
    }

    onBlur(){
        console.log("onBlur");
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
    onTouchShortcut(event : TouchGestureEventData, point){
        if(event.action !== 'down'){
            return;
        }
        let fp = Number(this.focused_tf.text);
        console.log("onTouchShortcut", this.focused_tf);
        fp = fp + point;
        this.focused_tf.text = String(fp);
    }
    onReturnPress(event){
        let tf = event.object as TextField;
        this.amount_num = Number(tf.text);
        if(this.amount_num > this.dataService.selected_way.balance){
            this.amount_num = this.dataService.selected_way.balance;
            tf.text = String(this.amount_num);
            tf.android.setSelection(tf.text.length);
        }
    }
    onTapTextfield(event, index){
        console.log("onTapTextfield");
        let kf = event.object as TextField;
        if(index === 1){
            this.tf1 = kf;
        }else{
            this.tf2 = kf;
        }
        let kl = this.modalkeypad.nativeElement as LayoutBase;
        this.modal_show(kl, this.isKeypadShow, ()=>{
            this.isKeypadShow = true;
        });
        kf.editable = false;
        kf.android.setRawInputType(0x00000000);
        kf.android.setTextIsSelectable(true);
        kf.android.setCursorVisible(true);
        kf.android.setFocusable(true);
        this.focused_tf = kf;
        if(index === 1){
            this.isUnder = true;
        }else if(index === 2){
            this.isUnder = false;
        }
        // kf.android.setFocusableInTouchMode(true);
        // kf.focus();
    }
    onFocusTf(event){
        console.log("onFocusTf");
        let kf = event.object as TextField;
        kf.dismissSoftInput();
        return true;
    }
    onChangeTextField(event){
        let kf = event.object as TextField;
        if(this.isUnder){
            kf.android.setSelection(this.cursor_auto_under);
        }else if(!this.isUnder){
            kf.android.setSelection(this.cursor_auto);
        }
        console.log("onChangeTextField", kf.android.getSelectionStart());
    }
    callback_tapNumber(num){
        console.log(this.tag, "callback_tapNumber =", num);
        // let kf = this.amounttf.nativeElement as TextField;
        let kf = this.focused_tf;
        let sel = kf.android.getSelectionStart();
        if(num == 'enter'){
            let kl = this.modalkeypad.nativeElement as LayoutBase;
            this.modal_hide(kl, this.isKeypadShow, ()=>{
                this.isKeypadShow = false;
            });
            console.log(this.tf1.text);
            console.log(this.tf2.text);
        }else if(num == 'back'){
            if(sel <= 0){

            }
            else if(sel === kf.text.length){
                if(this.isUnder)
                    this.cursor_auto_under = sel - 1;
                else if(!this.isUnder)
                    this.cursor_auto = sel - 1;
                kf.text = kf.text.slice(0, kf.text.length - 1);
            }else{
                let front = kf.text.slice(0, sel - 1);
                let back = kf.text.slice(sel, kf.text.length);
                if(this.isUnder)
                    this.cursor_auto_under = sel - 1;
                else if(!this.isUnder)
                    this.cursor_auto = sel - 1;
                kf.text = front + back;
            }
        }else if(num=='-1'){}
        else{
            if(kf.text.length > 20){}
            else if(sel === kf.text.length){
                if(this.isUnder)
                    this.cursor_auto_under = sel + 1;
                else if(!this.isUnder)
                    this.cursor_auto = sel + 1;
                kf.text = kf.text + String(num);
            }else{
                let front = kf.text.slice(0, sel);
                let back = kf.text.slice(sel, kf.text.length);
                front = front + String(num);
                if(this.isUnder)
                    this.cursor_auto_under = sel + 1;
                else if(!this.isUnder)
                    this.cursor_auto = sel + 1;
                    kf.text = front + back;
            }
        }
        console.log("this.cursor_auto_under ", this.cursor_auto_under);
        console.log("this.cursor_auto ", this.cursor_auto);
        // console.log(kf.text);
    }

    // lists //
    onTapWay(){
        console.log("onTapWay");
        // show or hide modal
        let frame = this.modalframe.nativeElement as LayoutBase;
        let modal = this.modal.nativeElement as LayoutBase;

        this.modal_show(modal, this.isModalShow, ()=>{this.isModalShow = true});
    }
    
    callback_selectWay(way){
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
            if(way.isCard === true){
                this.isCard = this.dataService.selected_way.type;
                // this.selected_way.img = this.dataService.selected_way.img;
                // this.selected_way.title = this.dataService.selected_way.title;
                // this.selected_way.number = this.dataService.selected_way.number;
                // this.selected_way.balance = this.dataService.selected_way.balance;
            }else{
                this.isCard = this.dataService.selected_way.type;
                // this.selected_way.img = this.dataService.selected_way.img;
                // this.selected_way.title = this.dataService.selected_way.title;
                // this.selected_way.number = this.dataService.selected_way.number;
                // this.selected_way.balance = this.dataService.selected_way.balance;
            }
            
            this.isModalShow = false;
        })
    }

    dialogSuccess(thenFunction : ()=>any){
        // success dialog
        alert({
            title: "포인트충전",
            message: "포인트충전에 성공했습니다",
            okButtonText: "확인"
        }).then(thenFunction);
    }

    charge(){
        this.transactionService.addTr({
            type:"transactions",
            class: "포인트충전",
            merchant: this.dataService.selected_way.title + " 충전",
            point: this.amount_num,
            curr: 0,
            country:"",
            date: new Date(),
            description: "포인트충전",
            taxfree: false,
            utu: false,
            save_point: 0,
        });
        this.dataService.addPoint(this.amount_num);
        this.dataService.decreaseWay(this.amount_num);
        this.dialogSuccess(()=>{
            this.routerExtensions.navigate(['/main/home'], { 
                transition: { instance : new CustomTransitionBack(250, AnimationCurve.linear) }, 
                clearHistory : true 
            });
        })
    }

    auto_charge(){
        console.log(this.tf1.text, this.tf2.text);
        this.dataService.setAuto(Number(this.tf1.text), Number(this.tf2.text), this.dataService.selected_way.title);
        alert({
            title: "포인트 자동충전",
            message: "포인트 자동충전을 설정했습니다",
            okButtonText: "확인"
        }).then(()=>{
            this.routerExtensions.navigate(['/main/home'], { 
                transition: { instance : new CustomTransitionBack(250, AnimationCurve.linear) }, 
                clearHistory : true 
            });
        });
    }

    // actionbar emit click close
    actionbar_click_close(isclose) {
        console.log(this.tag + " actionbar close button clicked = " + isclose);

        this.routerExtensions.navigate(['/main/home'], { 
            clearHistory:true, 
            transition: { instance : new CustomTransitionBack(250, AnimationCurve.linear) } 
        });
    }
    navigateBack(event) {
        console.log(`${this.tag} navigateBack`);
        if(this.routerExtensions.canGoBack()){
            this.routerExtensions.back({relativeTo: this.activatedRoute});
        }else{
            this.routerExtensions.navigate(['/main/home'], { 
                transition: { instance : new CustomTransitionBack(250, AnimationCurve.linear) }, 
                clearHistory : true 
            });
        }
    }
}
