import { KeyValue } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { AnimationCurve } from "@nativescript/core/ui/enums";

import { DataService } from "../../../service/data.service";
import { CountryService } from "../../../service/country.service";
import { TransactionService } from "../../../service/transaction.service";
import { CustomTransition } from "../../../util/klook-transition";

@Component({
    selector: "tr-history-embedded",
    templateUrl: "./tr-history-embedded.component.html",
    styleUrls:["./tr-history-embedded.component.scss"]
})
export class TrHistoryEmbeddedComponent implements OnInit {
    tag = this.constructor.name;

    transactions : any;

    constructor(private routerExtensions: RouterExtensions, 
        private dataService: DataService,
        private countryService : CountryService,
        private transactionService : TransactionService) {
        console.log(`${this.tag} constructor `)
        
        this.transactions = this.transactionService.tr_grouped;
    }

    ngOnInit(): void {
        console.log(`${this.tag} ngOnInit`);
        console.log(this.routerExtensions.router.url);
    }

    onTapTimeline(){
        this.routerExtensions.navigate(['/main/tr'], {
            transition: { instance: new CustomTransition(250, AnimationCurve.linear) }, clearHistory: true
        });
    }
    
    keyDescOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
        return a.key > b.key ? -1 : (b.key > a.key ? 1 : 0);
    }
}
