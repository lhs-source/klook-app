import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { isAndroid, Application, AndroidApplication, AndroidActivityBackPressedEventData } from "tns-core-modules";

@Component({
    selector: "tr-history-embedded",
    templateUrl: "./tr-history-embedded.component.html",
    styleUrls:["./tr-history-embedded.component.scss"]
})
export class TrHistoryEmbeddedComponent implements OnInit {
    tag = this.constructor.name;
    // trs
    icons = {
        "department":"~/images/ico_type2.png",
        "grocery":"~/images/ico_type3.png",
        "restorant":"~/images/ico_type5.png",
        "point":"~/images/ico_type1.png",
        "mart":"~/images/ico_type4.png",
        "sport":"~/images/ico_type6.png",
        "cafe":"~/images/ico_type7.png",
        "exchange":"~/images/ico_type8.png",
    };
    trs={
        "10월 30일 금요일":[
            {
                icon:"department",
                merchant:"Central Department Store",
                point:25000,
                curr:676,
                date: new Date(2020, 10, 30, 14, 23, 0, 0),
                description:"포인트사용",
                taxfree: true,
                utu:false,
                save_point:1250,
            },{
                icon:"grocery",
                merchant:"Family mart",
                point:4500,
                curr:122,
                date: new Date(2020, 10, 30, 11, 30, 0, 0),
                description:"포인트사용",
                taxfree: false,
                utu:true,
                save_point:45,
            }
        ],
        "10월 27일 화요일":[
            {
                icon:"point",
                merchant:"KB국민카드 Nori카드 충전",
                point:100000,
                curr:0,
                date: new Date(2020, 10, 27, 21, 10, 0, 0),
                description:"포인트 일반충전",
                taxfree: false,
                utu:false,
                save_point:0,
            }
        ]
    }

    constructor(private routerExtensions: RouterExtensions) {
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
    }
}
