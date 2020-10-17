import { Component, ElementRef, OnInit, ViewChild, Output, EventEmitter, Input } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";

// <way-list way-list="way-list" point="122" point_unit="HKD" backgroundColor="#ff5722">
// </way-list>
@Component({
    selector: "way-list",
    templateUrl: "./way-list.component.html",
    styleUrls: ["./way-list.component.scss"]
})
export class WayListComponent implements OnInit {
    tag = this.constructor.name;

    @Output('selectWay') selectWay : EventEmitter<any> = new EventEmitter();
    
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

    constructor(private routerExtensions: RouterExtensions) {
        console.log(`${this.tag} constructor `)

    }

    ngOnInit(): void {
        console.log(`${this.tag} ngOnInit`);
        console.log(this.routerExtensions.router.url);

        
    }
    onTapCard(card){
        let output = card;
        output.isCard = true;
        this.selectWay.emit(output);
    }

    onTapBank(bank){
        let output = bank;
        output.isCard = false;
        this.selectWay.emit(output);
    }

    ngOnDestroy(){
        console.log(`${this.tag} ngOnDestroy`);
    }
}
