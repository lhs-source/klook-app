import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";

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

    constructor() {}
    ngOnInit(): void {}
    onTapClose(event){
        // call parent function
        this.close_click.emit();
    }
}
