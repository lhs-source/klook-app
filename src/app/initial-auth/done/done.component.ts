import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "@nativescript/angular";

import { AnimationCurve } from "@nativescript/core/ui/enums";
import { AuthService } from "../../service/auth.service";
import { DataService } from "../../service/data.service";
import { MerchantService } from "../../service/merchant.service";
import { CountryService } from "../../service/country.service";
import { TransactionService } from "../../service/transaction.service";
import { CustomTransitionBack } from "../../util/klook-transition";

@Component({
    selector: "done",
    templateUrl: "./done.component.html",
    styleUrls:["./done.component.scss"]
})
export class DoneComponent implements OnInit {
    tag = this.constructor.name;
    constructor(private routerExtensions: RouterExtensions, private route: ActivatedRoute, private authService : AuthService,
        private merchantService : MerchantService,
        private countryService : CountryService,
        private transactionService : TransactionService,) {
        console.log(`${this.tag} constructor `)
    }

    ngOnInit(): void {
        console.log(`${this.tag} ngOnInit`);
        console.log(this.routerExtensions.router.url);

        this.authService.register();
        
        this.transactionService.initialize();
    }
    onTapNext(){
        this.routerExtensions.navigate(["../../main"], {
            relativeTo: this.route, clearHistory: true, transition: {
                name: 'fade',
                duration: 250,
                curve: AnimationCurve.easeOut
            }
        });
    }
    // actionbar emit click close
    actionbar_click_close(isclose){
        console.log(this.tag + " actionbar close button clicked = " + isclose);
        this.routerExtensions.navigate(['/main/home'], { 
            clearHistory:true, 
            transition: { instance : new CustomTransitionBack(250, AnimationCurve.linear) } 
        });
    }
}
