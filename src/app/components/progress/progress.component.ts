import { Component, OnInit, Input } from "@angular/core";
import { ProgressService } from "./progress.service";
import { ModalInterface } from "./modal-interface";
import { ModalDialogParams } from "@nativescript/angular";
import { isAndroid, Page } from "tns-core-modules";
import * as application from "tns-core-modules/application";

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
        private progressService: ProgressService,
        private page: Page) {
        this.progressService.setComponent(this);
        console.log("progress component constructor")

        this.page.on("shownModally", data => {
            if (isAndroid) {
                console.log("here");
                let fragmentManger = application.android.foregroundActivity.getFragmentManager();
                let dialogFragment = fragmentManger.findFragmentByTag("dialog");
                if (dialogFragment !== null) {
                    dialogFragment.setCancelable(false);
                    dialogFragment.setCanceledOnTouchOutside(false);;
                }
            }
    
        });
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
