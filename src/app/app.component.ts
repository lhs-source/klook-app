import { Component, OnInit, ElementRef, ViewChild, ViewChildren } from "@angular/core";

// android
import { AndroidApplication, AndroidActivityBackPressedEventData } from "tns-core-modules/application";
import { isAndroid } from "tns-core-modules/platform";
import { RouterExtensions } from "@nativescript/angular";
import { AuthService } from "./main/auth.service";

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
    styleUrls:["app.component.scss"]
})
export class AppComponent implements OnInit {
    tag = this.constructor.name;
    constructor(private routerExtensions : RouterExtensions, private authService: AuthService){
        console.log(this.tag, "constructor");
        
        if(this.authService.pin.length > 0){
            this.routerExtensions.navigate(['/initial-auth/pin'], { clearHistory:true });
        }else{
            this.routerExtensions.navigate(['/initial-auth'], { clearHistory:true });
        }
    }
    ngOnInit(): void {
        console.log(this.tag, "ngOnInit");
    }
}
