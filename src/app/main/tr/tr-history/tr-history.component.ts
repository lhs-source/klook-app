import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { AnimationCurve } from "@nativescript/core/ui/enums";
import { Application, AndroidApplication, AndroidActivityBackPressedEventData, isAndroid } from "tns-core-modules";

@Component({
    selector: "tr-history",
    templateUrl: "./tr-history.component.html",
    styleUrls: ["./tr-history.component.scss"]
})
export class TrHistoryComponent implements OnInit {
    tag = this.constructor.name;
    constructor(private routerExtensions: RouterExtensions) {
        console.log(`${this.tag} constructor `)

        if (isAndroid) {
            Application.android.off(AndroidApplication.activityBackPressedEvent);
            Application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
                console.log("back button pressed on " + this.tag);
                if(this.routerExtensions.router.isActive('/main/tr/history', false) === true){
                    data.cancel = true;
                    this.routerExtensions.navigate(['/main/home'], { clearHistory: true });
                }else{
                    data.cancel = false;
                }
            });
        }
    }

    ngOnInit(): void {
        console.log(`${this.tag} ngOnInit`);
        console.log(this.routerExtensions.router.url);
    }

    navigateDetails(event) {
        console.log(this.tag + " navigateChargePoint");
        this.routerExtensions.navigate(['/main/tr/detail'], { transition: { name: 'slide', duration: 350, curve: AnimationCurve.easeOut } });

    }
}
