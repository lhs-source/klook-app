import { Component, OnInit} from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
    styleUrls:["app.component.scss"]
})
export class AppComponent implements OnInit {
    tag = this.constructor.name;
    constructor(private routerExtensions : RouterExtensions){
        console.log(this.tag, "constructor");
    }
    ngOnInit(): void {
        console.log(this.tag, "ngOnInit");
    }
}
