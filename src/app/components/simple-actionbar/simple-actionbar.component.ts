import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";

// <simple-actionbar 
//      (close_click)="actionbar_click_close(isclose)" 
//      [isClose]="true">
// </simple-actionbar>
@Component({
    selector: "simple-actionbar",
    templateUrl: "./simple-actionbar.component.html",
    styleUrls: ["./simple-actionbar.component.scss"]
})
export class SimpleActionbarComponent implements OnInit {
    tag = this.constructor.name;
    
    // when close button clicked
    @Output() close_click : EventEmitter<any> = new EventEmitter();
    @Input() isClose = false;

    constructor() {}
    ngOnInit(): void {}

    onTapClose(event){
        // call parent function
        this.close_click.emit();
    }
}
