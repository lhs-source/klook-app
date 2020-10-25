import { Component, OnInit, Output, EventEmitter, Input, ViewChild, ElementRef } from "@angular/core";
import { LayoutBase } from "tns-core-modules";
import { AnimationCurve } from "@nativescript/core/ui/enums";

import { CountryService } from "../../service/country.service";

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

    constructor(private countryService : CountryService) {
        
    }
    ngOnInit(): void {
        let conmodalref = this.countrymodalref.nativeElement as LayoutBase;

        conmodalref.on('layoutChanged', (arg)=>{
            console.log("{layoutChanged} conmodalref")
            let conref = this.countryref.nativeElement as LayoutBase;
            // console.log(conmodalref.getLocationRelativeTo(conref));
            // console.log(conref.getLocationRelativeTo(conmodalref));
            let loc = conref.getLocationRelativeTo(conmodalref);
            this.modal_loc.x = loc.x - 2;
            this.modal_loc.y = loc.y + 32;
            conmodalref.translateX = this.modal_loc.x
            conmodalref.translateY = this.modal_loc.y;
            conmodalref.eachChild((view)=>{
                this.country_views.push(view);
                return true;
            })
        });
    }

    // current country btn
    onTapLocale(){
        console.log(this.tag, "{onTapLocale}");
        this.isModalShow = !this.isModalShow;
        
        let conref = this.countryref.nativeElement as LayoutBase;
        let conmodalref = this.countrymodalref.nativeElement as LayoutBase;

        if(this.isModalShow === true){
            conmodalref.animate({
                opacity:1,
                curve:AnimationCurve.easeOut
            })
        }else{
            conmodalref.animate({
                opacity:0,
                curve:AnimationCurve.easeOut
            })
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
    }

    onTapClose(event){
        // call parent function
        this.close_click.emit();
    }
}
