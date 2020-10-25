import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { AuthService } from "../../service/auth.service";
import { CustomTransition } from "../../util/klook-transition";
import { AnimationCurve } from "@nativescript/core/ui/enums";

@Component({
    selector: "KlookMain",
    templateUrl: "./klookmain.component.html",
    styleUrls:["./klookmain.component.scss"]
})
export class KlookMainComponent implements OnInit {
    tag = this.constructor.name;
    constructor(private routerExtensions : RouterExtensions, 
        private authService: AuthService) {
        console.log(`${this.tag} constructor `)

    }

    ngOnInit(): void {
        console.log(`${this.tag} ngOnInit`);
        console.log(this.routerExtensions.router.url);
    }
    onTapKlookPay(){
        if(this.authService.is_registered === true){
            // already registered
            this.routerExtensions.navigate(['/initial-auth/pin'], { 
                transition: { instance : new CustomTransition(250, AnimationCurve.linear) }
             });
        }else{
            // not registered, should register new user
            this.routerExtensions.navigate(['/initial-auth/terms'], { 
                transition: { instance : new CustomTransition(250, AnimationCurve.linear) } 
            });
        }
    }
}
