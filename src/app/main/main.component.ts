import { Component, OnInit, ViewChild } from "@angular/core";
import { Application } from "@nativescript/core";
import { AccountComponent } from "../account/account.component";
import { RouterExtensions } from "@nativescript/angular";
import { isAndroid } from "tns-core-modules/ui/core/view/view";
import { AndroidApplication, AndroidActivityBackPressedEventData } from "tns-core-modules/application/application";

@Component({
    selector: "Main",
    templateUrl: "./main.component.html",
    styleUrls:["./main.component.scss"]
})
export class MainComponent implements OnInit {
    
    @ViewChild(AccountComponent) account_modal : AccountComponent;
    isNavShow = false;
    ngiftest = false;

    constructor(private routerExtensions : RouterExtensions) {
        console.log("constructor MainComponent");
    }

    ngOnInit(): void {
        console.log("ngOnInit MainComponent");
        
        // navl.translateX = 100;
        if (!isAndroid) {
            return;
        }
        Application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
            console.log("back button pressed on MainComponent");
            if(this.isNavShow === true){
                data.cancel = true;
                this.onTabAccount();
                console.log("this.isNavShow == true");
            }
        // if (this.routerExtensions.router.isActive("/articles", false)) {
        //     data.cancel = true; // prevents default back button behavior
        // }
        });
    }


    onTabAccount(){
        console.log("click account button");
        this.isNavShow = !this.isNavShow;
        this.account_modal.toggle();        
    }

    // click handler button inside modal
    // event : is the modal showed 
    modal_inside_click(event){
        this.isNavShow = !this.isNavShow;
        console.log("modal_inside_click");
        console.log(event);
    }
}
