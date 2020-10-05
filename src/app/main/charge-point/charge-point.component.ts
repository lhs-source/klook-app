import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { AnimationCurve } from "@nativescript/core/ui/enums";
import { ActivatedRoute } from "@angular/router";
import { isAndroid, Application, AndroidApplication, AndroidActivityBackPressedEventData } from "tns-core-modules";

@Component({
    selector: "charge-point",
    templateUrl: "./charge-point.component.html",
    styleUrls:["./charge-point.component.scss"]
})
export class ChargePointComponent implements OnInit {
    tag = this.constructor.name;
    constructor(private routerExtensions : RouterExtensions, private activatedRoute : ActivatedRoute) {
        console.log(`${this.tag} constructor `)
        
        // if (isAndroid) {
        //     Application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
        //         console.log("back button pressed on " + this.tag);
        //         data.cancel = true;
        //         this.routerExtensions.navigate(['/main/home'], {clearHistory : true});
        //     });
        // }
        
        Application.android.off(AndroidApplication.activityBackPressedEvent);
        Application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
            console.log("back button pressed on " + this.tag);
            data.cancel = true;
            this.routerExtensions.navigate(['/main/home'], {clearHistory : true});
        });
    }

    ngOnInit(): void {
        console.log(`${this.tag} ngOnInit`);
        console.log(this.routerExtensions.router.url);
    }
    navigateBack(event) {
        console.log(`${this.tag} navigateBack`);
        if(this.routerExtensions.canGoBack()){
            this.routerExtensions.back({relativeTo: this.activatedRoute});
        }else{
            this.routerExtensions.navigate(['/main/home'], { transition: { name: 'fade', duration: 350, curve: AnimationCurve.easeOut }, clearHistory : true });
        }
    }
}
