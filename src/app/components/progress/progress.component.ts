import { Component, OnInit, Input } from "@angular/core";
import { ProgressService } from "./progress.service";
import { ModalInterface } from "./modal-interface";
import { ModalDialogParams } from "@nativescript/angular";

// * Usage
// <progress progress="progress" point="122" point_unit="HKD" backgroundColor="#ff5722"></progress>
@Component({
    selector: "my-progress",
    templateUrl: "./progress.component.html",
    styleUrls: ["./progress.component.scss"]
})
export class ProgressComponent implements OnInit, ModalInterface {
    tag = this.constructor.name;

    constructor(
        private params: ModalDialogParams,
        private progressService: ProgressService) {
        this.progressService.setComponent(this);
        console.log("progress component constructor")
    }

    public close(result: string) {
        this.params.closeCallback(result);
    }
    closeModalDialog(): void {
        console.log("progress component closeModalDialog")
        this.params.closeCallback();
    }
    ngOnInit(): void { }
}
