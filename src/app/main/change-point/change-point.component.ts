import { Component, OnInit } from "@angular/core";
import { AnimationCurve } from "@nativescript/core/ui/enums";
import { RouterExtensions } from "@nativescript/angular";
import { ActivatedRoute } from "@angular/router";
import { isAndroid, Application, AndroidApplication, AndroidActivityBackPressedEventData, TextField } from "tns-core-modules";
import { CustomTransitionBack } from "../home/klook-transition";
import { DataService } from "../data.service";

@Component({
    selector: "change-point",
    templateUrl: "./change-point.component.html",
    styleUrls:["./change-point.component.scss"]
})
export class ChangePointComponent implements OnInit {
    tag = this.constructor.name;

    // datas
    title = "포인트 교환"
    point = 0;

    // prepared
    pointy={
        title:"KB국민카드 포인트리",
        balance: 25000,
        exchange:1,
    }

    // amount
    amount = '1000';
    amount_num = 1000;

    constructor(private routerExtensions : RouterExtensions, 
        private activatedRoute : ActivatedRoute,
        private dataService : DataService) {
        console.log(`${this.tag} constructor `);

        this.point = this.dataService.point;

        if (isAndroid) {
            Application.android.off(AndroidApplication.activityBackPressedEvent);
            Application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
                console.log(this.tag + " back button pressed ");
                data.cancel = true;
                this.routerExtensions.navigate(['/main/home'], { transition:{instance : new CustomTransitionBack(250, AnimationCurve.linear)}, clearHistory: true });
            });
        }
    }

    ngOnInit(): void {
        console.log(`${this.tag} ngOnInit`);
        console.log(this.routerExtensions.router.url);
    }

    onReturnPress(event){
        let tf = event.object as TextField;
        this.amount_num = Number(tf.text);
        if(this.amount_num > this.pointy.balance){
            this.amount_num = this.pointy.balance;
            tf.text = String(this.amount_num);
            tf.android.setSelection(tf.text.length);
        }
    }

    change(event){
        this.dataService.addPoint(this.amount_num);
        this.routerExtensions.navigate(['/main/home'], { transition: { instance : new CustomTransitionBack(250, AnimationCurve.linear) }, clearHistory : true });
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
