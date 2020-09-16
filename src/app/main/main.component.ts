import { Component, OnInit } from "@angular/core";

@Component({
    selector: "Main",
    templateUrl: "./main.component.html",
    styleUrls:["./main.component.scss"]
})
export class MainComponent implements OnInit {
    constructor() {
        console.log("constructor MainComponent");
    }

    ngOnInit(): void {
        console.log("ngOnInit MainComponent");
    }
}
