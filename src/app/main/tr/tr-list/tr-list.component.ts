import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { AnimationCurve } from "@nativescript/core/ui/enums";
import { Application, AndroidApplication, AndroidActivityBackPressedEventData, isAndroid, EventData, LayoutBase, View, Color, Label } from "tns-core-modules";
import { screen } from "tns-core-modules/platform";

import { CustomTransition, CustomTransitionBack } from "../../../util/klook-transition";
import { animate, JsAnimationDefinition } from "../../../util/animation-helpers";
import { KeyValue } from "@angular/common";
import { DataService } from "../../../service/data.service";
import { TransactionService } from "../../../service/transaction.service";
import { CountryService } from "../../../service/country.service";
import { PaymentData } from "../../../service/payment-data.model";

@Component({
    selector: "tr-list",
    templateUrl: "./tr-list.component.html",
    styleUrls: ["./tr-list.component.scss"]
})
export class TrListComponent implements OnInit {
    tag = this.constructor.name;
    
    @Input('grouped') grouped = true;
    @Input('transactions') transactions : any;

    constructor(private routerExtensions: RouterExtensions, 
        private transactionService: TransactionService,
        private countryService : CountryService,
        private dataService : DataService) {
        
        
        
    }

    ngOnInit(): void {
        console.log(`${this.tag} ngOnInit`);
    }

    keyDescOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
        return a.key > b.key ? -1 : (b.key > a.key ? 1 : 0);
    }

    get getTrSize(){
        if(Array.isArray(this.transactions)){
            return this.transactions.length;
        }else{
            var size = 0, key;
            for (key in this.transactions) {
                if (this.transactions.hasOwnProperty(key)) size++;
            }
            return size;
        }
    }

    onTapTr(tr) {
        console.log(this.tag, " onTapTr tr = ", tr);
        console.log("date = ", tr.date);
        this.routerExtensions.navigate(['/main/tr/detail', (tr.date as Date).getTime()], { 
            transition: { instance: new CustomTransition(250, AnimationCurve.linear) }, 
        });
    }
}
