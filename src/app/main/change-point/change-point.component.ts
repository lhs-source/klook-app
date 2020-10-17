import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { AnimationCurve } from "@nativescript/core/ui/enums";
import { RouterExtensions } from "@nativescript/angular";
import { ActivatedRoute } from "@angular/router";
import { isAndroid, Application, AndroidApplication, AndroidActivityBackPressedEventData, TextField, LayoutBase, Color } from "tns-core-modules";
import { screen } from "tns-core-modules/platform";
import { CustomTransitionBack } from "../home/klook-transition";
import { DataService } from "../data.service";

@Component({
    selector: "change-point",
    templateUrl: "./change-point.component.html",
    styleUrls:["./change-point.component.scss"]
})
export class ChangePointComponent implements OnInit {
    tag = this.constructor.name;

    // datas
    title = "포인트 교환"
    point = 0;

    // prepared
    pointy={
        title:"KB국민카드 포인트리",
        balance: 25000,
        exchange:1,
    }

    // amount
    @ViewChild('tf') tf : ElementRef;
    amount = '1000';
    amount_num = 1000;
    
    // modal
    @ViewChild('modalframe', {static:true}) modalframe : ElementRef;
    @ViewChild('modal', {static:true}) modal : ElementRef;
    isModalShow=false;

    constructor(private routerExtensions : RouterExtensions, 
        private activatedRoute : ActivatedRoute,
        private dataService : DataService) {
        console.log(`${this.tag} constructor `);

        this.point = this.dataService.point;

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
            this.pointy = event;
            
            let tf = this.tf.nativeElement as TextField;
            this.amount_num = Number(tf.text);
            if(this.amount_num > this.pointy.balance){
                this.amount_num = this.pointy.balance;
                tf.text = String(this.amount_num);
                tf.android.setSelection(tf.text.length);
            }
        });
    }

    onReturnPress(event){
        let tf = event.object as TextField;
        this.amount_num = Number(tf.text);
        if(this.amount_num > this.pointy.balance){
            this.amount_num = this.pointy.balance;
            tf.text = String(this.amount_num);
            tf.android.setSelection(tf.text.length);
        }
    }

    change(event){
        this.dataService.addPoint(this.amount_num);
        this.routerExtensions.navigate(['/main/home'], { transition: { instance : new CustomTransitionBack(250, AnimationCurve.linear) }, clearHistory : true });
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
