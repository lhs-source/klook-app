import { Component, ElementRef, OnInit, ViewChild, Output, EventEmitter, Input } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";

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
