import { Component, OnInit } from "@angular/core";

@Component({
    selector: "Chargepoint",
    templateUrl: "./chargepoint.component.html",
    styleUrls:["./chargepoint.component.scss"]
})
export class ChargepointComponent implements OnInit {
    constructor() {
        console.log("constructor ChargepointComponent");
    }

    ngOnInit(): void {
        console.log("ngOnInit ChargepointComponent");
    }
}
