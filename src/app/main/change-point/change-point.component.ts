import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { AnimationCurve } from "@nativescript/core/ui/enums";
import { RouterExtensions } from "@nativescript/angular";
import { ActivatedRoute } from "@angular/router";
import { isAndroid, Application, AndroidApplication, AndroidActivityBackPressedEventData, TextField, LayoutBase, Color } from "tns-core-modules";
import { screen } from "tns-core-modules/platform";
import { CustomTransitionBack } from "../../util/klook-transition";
import { DataService } from "../../service/data.service";

import { alert } from "tns-core-modules/ui/dialogs";
import { TransactionService } from "../../service/transaction.service";

@Component({
    selector: "change-point",
    templateUrl: "./change-point.component.html",
    styleUrls:["./change-point.component.scss"]
})
export class ChangePointComponent implements OnInit {
    tag = this.constructor.name;

    // datas
    title = "포인트 교환"

    // prepared
    // pointy={
    //     title:"KB국민카드 포인트리",
    //     balance: 25000,
    //     exchange:1,
    // }

    // amount
    @ViewChild('tf') tf : ElementRef;
    amount = '';
    amount_num = 0;
    
    // modal
    @ViewChild('modalframe', {static:true}) modalframe : ElementRef;
    @ViewChild('modal', {static:true}) modal : ElementRef;
    isModalShow=false;

    constructor(private routerExtensions : RouterExtensions, 
        private activatedRoute : ActivatedRoute,
        private dataService : DataService,
        private transactionService : TransactionService) {
        console.log(`${this.tag} constructor `);

        if (isAndroid) {
            Application.android.off(AndroidApplication.activityBackPressedEvent);
            Application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
                console.log(this.tag + " back button pressed ");
                data.cancel = true;
                this.routerExtensions.navigate(['/main/home'], { transition:{instance : new CustomTransitionBack(250, AnimationCurve.linear)}, clearHistory: true });
            });
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
    }

    onTapBack(){
        let modal = this.modal.nativeElement as LayoutBase;
        this.modal_hide(modal, this.isModalShow, ()=>{this.isModalShow = false});
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
    
    onTapTarget(){
        let kl = this.modal.nativeElement as LayoutBase;
        this.modal_show(kl, this.isModalShow, ()=>{
            this.isModalShow = true;
        });
    }

    callback_selectPoint(event){
        let kl = this.modal.nativeElement as LayoutBase;
        this.modal_hide(kl, this.isModalShow, ()=>{
            this.isModalShow = false;
            this.dataService.selected_pointry;
            
            let tf = this.tf.nativeElement as TextField;
            this.amount_num = tf.text.length <= 0 ? 0 : Number(tf.text);
            if(this.amount_num > this.dataService.selected_pointry.balance){
                this.amount_num = this.dataService.selected_pointry.balance;
                tf.text = String(this.amount_num);
                tf.android.setSelection(tf.text.length);
            }
        });
    }
    
    onChangeTextField(){
        console.log("amount = ", this.amount);
        let string = String(this.amount);
    }

    onReturnPress(event){
        let tf = event.object as TextField;
        this.amount_num = Number(tf.text.replace(/[^0-9.]/g, ""));
        console.log(tf.text);
        console.log(tf.text.replace(/[^0-9.]/g, ""));
        console.log(this.amount_num);
        if(this.amount_num > this.dataService.selected_pointry.balance){
            this.amount_num = this.dataService.selected_pointry.balance;
            console.log(this.amount_num);
            this.amount = this.amount_num.toLocaleString('en-GB');
            tf.text = this.amount_num.toLocaleString('en-GB');
            tf.android.setSelection(tf.text.length);
            console.log(this.amount);
        }
    }

    change(event){
        if (this.amount_num <= 0) {
            alert({
                title: "포인트교환",
                message: "교환 금액을 확인해주세요",
                okButtonText: "확인"
            });
        } else {
            this.transactionService.addTr({
                type:"transactions",
                class: "포인트교환",
                merchant: this.dataService.selected_pointry.title + " 교환",
                point: this.amount_num * this.dataService.selected_pointry.exchange,
                curr: 0,
                country:"",
                date: new Date(),
                description: "포인트교환",
                taxfree: false,
                utu: false,
                save_point: 0,
            });            
            alert({
                title: "포인트교환 성공",
                message: "포인트교환에 성공했습니다",
                okButtonText: "확인"
            }).then(()=>{
                this.dataService.addPoint(this.amount_num * this.dataService.selected_pointry.exchange);
                this.dataService.decreasePointry(this.amount_num);
                this.routerExtensions.navigate(['/main/home'], { 
                    transition: { instance : new CustomTransitionBack(250, AnimationCurve.linear) }, 
                    clearHistory : true 
                });
            })
        }
    }

    // actionbar emit click close
    actionbar_click_close(isclose) {
        console.log(this.tag + " actionbar close button clicked = " + isclose);

        this.routerExtensions.navigate(['/main/home'], { clearHistory:true, transition: { instance : new CustomTransitionBack(250, AnimationCurve.linear) } });
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
