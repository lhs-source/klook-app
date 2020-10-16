import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { isAndroid, Application, AndroidApplication, AndroidActivityBackPressedEventData, LayoutBase } from "tns-core-modules";

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

    constructor(private routerExtensions: RouterExtensions, private elRef : ElementRef) {
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
}
