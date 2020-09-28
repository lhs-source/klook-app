import { Component, OnInit } from "@angular/core";

@Component({
    selector: "tr-history-embedded",
    templateUrl: "./tr-history-embedded.component.html",
    styleUrls:["./tr-history-embedded.component.scss"]
})
export class TrHistoryEmbeddedComponent implements OnInit {
    constructor() {
        console.log("constructor TrHistoryEmbeddedComponent");
    }

    ngOnInit(): void {
        console.log("ngOnInit TrHistoryEmbeddedComponent");
    }
}
