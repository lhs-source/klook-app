import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { AnimationCurve } from "@nativescript/core/ui/enums";
import { ActivatedRoute } from "@angular/router";
import { isAndroid, Application, AndroidApplication, AndroidActivityBackPressedEventData } from "tns-core-modules";
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

    constructor(private routerExtensions : RouterExtensions, private activatedRoute : ActivatedRoute) {
        console.log(`${this.tag} constructor `)
        
        Application.android.off(AndroidApplication.activityBackPressedEvent);
        Application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
            console.log("back button pressed on " + this.tag);
            data.cancel = true;
            this.routerExtensions.navigate(['/main/home'], {transition:{instance : new CustomTransitionBack(250, AnimationCurve.linear)}, clearHistory : true});
        });
    }

    ngOnInit(): void {
        console.log(`${this.tag} ngOnInit`);
        console.log(this.routerExtensions.router.url);
    }

    callback_tab_tap(index){
        console.log(this.tag, "callback_tab_tap =", index);
        if(index == 0){
            this.title = "포인트 충전 > 일반충전";
            this.isNormal = true;
        }else {
            this.title = "포인트 충전 > 자동충전";
            this.isNormal = false;
        }
    }

    onTapCard(card){
        // console.log(this.tag, "card =", card);
        this.selected_way.isCard = true;
        this.selected_way.img = card.img;
        this.selected_way.title = card.title;
        this.selected_way.number = card.number;
        this.selected_way.balance = card.balance;
    }

    onTapBank(bank){
        // console.log(this.tag, "bank =", bank);
        this.selected_way.isCard = false;
        this.selected_way.img = bank.img;
        this.selected_way.title = bank.title;
        this.selected_way.number = bank.number;
        this.selected_way.balance = bank.balance;
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
