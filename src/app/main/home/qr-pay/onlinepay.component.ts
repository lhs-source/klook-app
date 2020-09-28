import { Component, OnInit } from "@angular/core";

@Component({
    selector: "Onlinepay",
    templateUrl: "./account.component.html",
    styleUrls:["./account.component.scss"]
})
export class OnlinepayComponent implements OnInit {
    constructor() {
        console.log("constructor OnlinepayComponent");
    }

    ngOnInit(): void {
        console.log("ngOnInit OnlinepayComponent");
    }
}
