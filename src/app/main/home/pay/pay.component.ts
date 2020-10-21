import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { isAndroid, Application, AndroidApplication, AndroidActivityBackPressedEventData, LayoutBase } from "tns-core-modules";
import { AnimationCurve } from "@nativescript/core/ui/enums";
import { DataService } from "../../data.service";
import { CustomTransitionBack } from "../klook-transition";
import { HomeRoutingService } from "../home-routing.service";

@Component({
    selector: "pay",
    templateUrl: "./pay.component.html",
    styleUrls: ["./pay.component.scss"]
})
export class PayComponent implements OnInit {
    tag = this.constructor.name;
    @ViewChild('rootlayout', {static:true}) rootlayout : ElementRef;
    
    pay_info = {
        merchant:"Central Department Store",
        amount:419,
        point:15500,
    }
    currency = "THB";

    constructor(private routerExtensions: RouterExtensions, private elRef : ElementRef, private routingService:HomeRoutingService, private dataService : DataService) {
        console.log(`${this.tag} constructor `)
        
        if (isAndroid) {
        }
    }

    ngOnInit(): void {
        console.log(`${this.tag} ngOnInit`);
        console.log(this.routerExtensions.router.url);

        let root = this.rootlayout.nativeElement as LayoutBase;
        console.log(root);
        console.log(this.elRef.nativeElement);
    }

    onTapNo(event){
        this.routerExtensions.navigate(['/main/home/tr-embedded'], { clearHistory:true, transition: {
            name: 'fade',
            duration: 250,
            curve: AnimationCurve.easeOut
        } });
        
    }
    onTapYes(event){
        this.dataService.addTr({
            icon: "식당",
            merchant: "EATHAI",
            point: 37000,
            curr: 1001,
            date: new Date(2020, 10, 12, 18, 20, 0, 0),
            description: "포인트사용",
            taxfree: false,
            utu: true,
            save_point: 370,
        });
        this.routingService.emitChange('tr');
        this.routerExtensions.navigate(['/main/home/tr-embedded'], { clearHistory:true, transition: {
            name: 'fade',
            duration: 250,
            curve: AnimationCurve.easeOut
        } });
    }
}
