import { Component, OnInit, ElementRef, ViewChild, ViewChildren } from "@angular/core";

// android
import { AndroidApplication, AndroidActivityBackPressedEventData } from "tns-core-modules/application";
import { isAndroid } from "tns-core-modules/platform";
import { RouterExtensions } from "@nativescript/angular";
import { AuthService } from "./service/auth.service";

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
    styleUrls:["app.component.scss"]
})
export class AppComponent implements OnInit {
    tag = this.constructor.name;
    constructor(private routerExtensions : RouterExtensions, private authService: AuthService){
        console.log(this.tag, "constructor", this.authService.is_registered);
        
        if(this.authService.is_registered === true){
            // already registered
            this.routerExtensions.navigate(['/initial-auth/pin'], { clearHistory:true });
        }else{
            // not registered, should register new user
            this.routerExtensions.navigate(['/initial-auth'], { clearHistory:true });
        }
    }
    ngOnInit(): void {
        console.log(this.tag, "ngOnInit");
    }
}
