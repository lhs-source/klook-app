import { KeyValue } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { isAndroid, Application, AndroidApplication, AndroidActivityBackPressedEventData } from "tns-core-modules";
import { DataService } from "../../data.service";

@Component({
    selector: "tr-history-embedded",
    templateUrl: "./tr-history-embedded.component.html",
    styleUrls:["./tr-history-embedded.component.scss"]
})
export class TrHistoryEmbeddedComponent implements OnInit {
    tag = this.constructor.name;

    // trs
    icons = {
        "백화점": "~/images/ico_type2.png",
        "편의점": "~/images/ico_type3.png",
        "식당": "~/images/ico_type5.png",
        "포인트충전": "~/images/ico_type1.png",
        "마트": "~/images/ico_type4.png",
        "스포츠": "~/images/ico_type6.png",
        "카페": "~/images/ico_type7.png",
        "포인트교환": "~/images/ico_type8.png",
    };
    trs = {};
    currency="THB"

    constructor(private routerExtensions: RouterExtensions, private dataService: DataService) {
        console.log(`${this.tag} constructor `)
        
        if (isAndroid) {
            // Application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
            //     console.log("back button pressed on " + this.tag);
            //     data.cancel = true;
            //     this.routerExtensions.navigate(['/main/home'], {clearHistory : true});
            // });
        }
    }

    ngOnInit(): void {
        console.log(`${this.tag} ngOnInit`);
        console.log(this.routerExtensions.router.url);

        this.trs = this.dataService.getTrsGrouped();
    }
    
    keyDescOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
        return a.key > b.key ? -1 : (b.key > a.key ? 1 : 0);
    }
}
