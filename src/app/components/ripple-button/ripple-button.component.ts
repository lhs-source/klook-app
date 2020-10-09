import { Component, ElementRef, OnInit, ViewChild, Output, EventEmitter, Input } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";

// <myactionbar 
//      (close_click)="actionbar_click_close(isclose)" 
//      [isClose]="true">
// </myactionbar>
@Component({
    selector: "myactionbar",
    templateUrl: "./actionbar.component.html",
    styleUrls: ["./actionbar.component.scss"]
})
export class MyActionBarComponent implements OnInit {
    tag = this.constructor.name;
    
    // when close button clicked
    @Output() close_click : EventEmitter<any> = new EventEmitter();
    @Input() isClose = false;

    locale = [
        "태국",
        "한국",
        "일본",
        "중국",
        "홍콩"
    ]
    locale_index=0;

    constructor(private routerExtensions: RouterExtensions) {
        console.log(`${this.tag} constructor `)

    }

    ngOnInit(): void {
        console.log(`${this.tag} ngOnInit`);
        console.log(this.routerExtensions.router.url);

        
    }

    ngOnDestroy(){
        console.log(`${this.tag} ngOnDestroy`);
    }

    onTapClose(event){

        // call parent function
        this.close_click.emit();
    }
}
