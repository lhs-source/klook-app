import { Component, OnInit, Output, EventEmitter, Input, ViewChild, ElementRef } from "@angular/core";
import { LayoutBase, StackLayout } from "tns-core-modules";
import { AnimationCurve } from "@nativescript/core/ui/enums";
import { screen } from "tns-core-modules/platform/platform"

import { CountryService } from "../../service/country.service";
import { CustomTransition } from "../../util/klook-transition";
import { RouterExtensions } from "@nativescript/angular";

// <myactionbar 
//      (close_click)="actionbar_click_close(isclose)" 
//      (select_country)="callback_select_country()"
//      [isClose]="true">
// </myactionbar>
@Component({
    selector: "myactionbar",
    templateUrl: "./actionbar.component.html",
    styleUrls: ["./actionbar.component.scss"]
})
export class MyActionBarComponent implements OnInit {
    tag = this.constructor.name;
    @ViewChild('countryref', {static : true}) countryref : ElementRef;
    @ViewChild('countrymodalref', {static : true}) countrymodalref : ElementRef;

    // when close button clicked
    @Output() close_click : EventEmitter<any> = new EventEmitter();
    @Output() select_country : EventEmitter<any> = new EventEmitter();
    @Input() isClose = false;
    @Input() isPayment = false;

    locale = [
        "태국",
        "한국",
        "일본",
        "중국",
        "홍콩"
    ]
    locale_index=0;

    countries_img = {
        "싱가포르":"~/images/ico_sg.png",
        "태국":"~/images/ico_th.png",
        "홍콩":"~/images/ico_hk.png",
        "말레이시아":"~/images/ico_ml.png",
        "미국":"~/images/ico_usa.png",
    }
    countries_mapping = {
        "싱가포르":"싱가폴",
        "태국":"태국",
        "홍콩":"홍콩",
        "말레이시아":"말레이",
        "미국":"미국",
    }

    isModalShow= false;
    country_views =[];
    modal_loc ={x:0, y:0};

    constructor(
        private routerExtensions : RouterExtensions,
        private countryService : CountryService) {
        
    }
    ngOnInit(): void {
        let conmodalref = this.countrymodalref.nativeElement as LayoutBase;

        conmodalref.on('layoutChanged', (arg)=>{
            console.log("{layoutChanged} conmodalref")
            let p = screen.mainScreen.heightDIPs / screen.mainScreen.heightPixels;
            
            let conref = this.countryref.nativeElement as LayoutBase;
            // console.log(conmodalref.getLocationRelativeTo(conref));
            // console.log(conref.getLocationRelativeTo(conmodalref));
            let loc = conref.getLocationRelativeTo(conmodalref);
            this.modal_loc.x = loc.x - 2;
            this.modal_loc.y = loc.y + 32;
            conmodalref.translateX = this.modal_loc.x
            conmodalref.translateY = this.modal_loc.y;
            // conmodalref.height = conmodalref.getMeasuredHeight() * p / 2,
            conmodalref.eachChild((view)=>{
                this.country_views.push(view);
                return true;
            })
            let count = 0;
            
            conmodalref.eachChild((view)=>{
                let sl = view as StackLayout;
                sl.translateY = -(count * 24);
                count = count + 1;
                return true;
            });
        });
    }

    // current country btn
    onTapLocale(){
        console.log(this.tag, "{onTapLocale}");
        this.isModalShow = !this.isModalShow;
        
        let conref = this.countryref.nativeElement as LayoutBase;
        let conmodalref = this.countrymodalref.nativeElement as LayoutBase;

        let p = screen.mainScreen.heightDIPs / screen.mainScreen.heightPixels;
        if(this.isModalShow === true){
            conmodalref.animate({
                opacity:1,
                // height:conmodalref.getMeasuredHeight() * p * 2,
                duration:100,
                curve:AnimationCurve.easeOut
            })
            let count = 0;
            conmodalref.eachChild((view)=>{
                let sl = view as StackLayout;
                sl.animate({
                    translate: {x:0, y: 0},
                    duration:100,
                    curve:AnimationCurve.easeOut
                });
                count = count + 1;
                return true;
            });
        }else{
            conmodalref.animate({
                opacity:0,
                // height:conmodalref.getMeasuredHeight() * p / 2,
                duration:100,
                curve:AnimationCurve.easeOut
            })
            let count = 0;
            conmodalref.eachChild((view)=>{
                let sl = view as StackLayout;
                sl.animate({
                    translate: {x:0, y: -(count * 24)},
                    duration:100,
                    curve:AnimationCurve.easeOut
                });
                count = count + 1;
                return true;
            });
        }
    }

    // select new country
    onTapCountry(event, con_key){
        this.countryService.country = con_key;
        
        this.isModalShow = !this.isModalShow;
        // this.select_country.emit(this.countryService.country);
        let conmodalref = this.countrymodalref.nativeElement as LayoutBase;
        conmodalref.animate({
            opacity:0,
            curve:AnimationCurve.easeOut
        })
        let count = 0;
        conmodalref.eachChild((view)=>{
            let sl = view as StackLayout;
            sl.animate({
                translate: {x:0, y: -(count * 24)},
                curve:AnimationCurve.easeOut
            });
            count = count + 1;
            return true;
        });
    }

    onTapClose(event){
        // call parent function
        if(this.isClose === true){
            this.close_click.emit();
        }else{
            this.routerExtensions.navigate(['/main/account'], {
                transition: { instance: new CustomTransition(250, AnimationCurve.linear) }, clearHistory: true
            });
        }
    }
}
