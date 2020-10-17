import { Component, ElementRef, OnInit, ViewChild, Output, EventEmitter, Input } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";

// <point-list point-list="point-list" point="122" point_unit="HKD" backgroundColor="#ff5722">
// </point-list>
@Component({
    selector: "point-list",
    templateUrl: "./point-list.component.html",
    styleUrls: ["./point-list.component.scss"]
})
export class PointListComponent implements OnInit {
    tag = this.constructor.name;

    @Output('selectPoint') selectPoint : EventEmitter<any> = new EventEmitter();
    
    // prepared data
    pointry=[
        {
            img:"~/images/img_kbcard.png",
            title:"KB국민카드 포인트리",
            balance: 25000,
            exchange:1,
            selected:true,
        },
        {
            img:"~/images/img_asiana.png",
            title:"아시아나항공 마일리지",
            balance: 13000,
            exchange:20/13,
            selected:false,
        },
        {
            img:"~/images/img_jeju.png",
            title:"제주항공 마일리지",
            balance: 18000,
            exchange:3/2,
            selected:false,
        }
    ];

    constructor(private routerExtensions: RouterExtensions) {
        console.log(`${this.tag} constructor `)

    }

    ngOnInit(): void {
        console.log(`${this.tag} ngOnInit`);
        console.log(this.routerExtensions.router.url);

        
    }
    onTapPoint(point){
        let output = point;
        this.pointry.forEach((elem)=>{
            if(elem.selected === true)
            elem.selected = false;
        });
        point.selected = true;
        this.selectPoint.emit(output);
    }

    ngOnDestroy(){
        console.log(`${this.tag} ngOnDestroy`);
    }
}
