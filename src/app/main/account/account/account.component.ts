import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { AnimationCurve } from "@nativescript/core/ui/enums";
import { isAndroid, Application, AndroidApplication, AndroidActivityBackPressedEventData } from "tns-core-modules";
import { CustomTransition, CustomTransitionBack } from "../../../util/klook-transition";

@Component({
    selector: "account",
    templateUrl: "./account.component.html",
    styleUrls:["./account.component.scss"]
})
export class AccountComponent implements OnInit {
    tag = this.constructor.name;
    constructor(private routerExtensions : RouterExtensions) {
        console.log(`${this.tag} constructor `)
        
        if (isAndroid) {
            Application.android.off(AndroidApplication.activityBackPressedEvent);
            Application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
                console.log(this.tag + " back button pressed ");
                if(this.routerExtensions.router.isActive('/main/account/list', false) === true){
                    data.cancel = true;
                    this.routerExtensions.navigate(['/main/home'], { transition:{instance : new CustomTransitionBack(250, AnimationCurve.linear)}, clearHistory: true });
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

    // actionbar emit click close
    actionbar_click_close(isclose) {
        console.log(this.tag + " actionbar close button clicked = " + isclose);

        this.routerExtensions.navigate(['/main/home'], { clearHistory:true, transition: { instance : new CustomTransitionBack(250, AnimationCurve.linear) } });
    }

    onTabDisconnect(event){

    }
    navigateLink(event) {
        console.log(`${this.tag} navigateChargePoint`);
        this.routerExtensions.navigate(['/main/account/link'], { transition: { instance : new CustomTransition(250, AnimationCurve.linear) } });

    }
    
    navigatePassport(event) {
        console.log(`${this.tag} navigateChargePoint`);
        this.routerExtensions.navigate(['/main/account/passport'], { transition: { instance : new CustomTransition(250, AnimationCurve.linear) } });

    }
}
