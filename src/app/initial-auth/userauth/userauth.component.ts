import { Component, OnInit } from "@angular/core";

import { RouterExtensions } from "@nativescript/angular";
import { AnimationCurve } from "@nativescript/core/ui/enums";

@Component({
    selector: "UserAuth",
    templateUrl: "./userauth.component.html",
    styleUrls:["./userauth.component.scss"]
})
export class UserAuthComponent implements OnInit {
    tag = this.constructor.name;
    constructor(private routerExtensions : RouterExtensions) {
        console.log(`${this.tag} constructor `)
    }

    ngOnInit(): void {
        console.log(`${this.tag} ngOnInit`);
        console.log(this.routerExtensions.router.url);
    }
    
    onTapNext(event){
        console.log("onTapNext TermsComponent");
        this.routerExtensions.navigate(['/initial-auth/pin-new'], {transition : {name:'slide', duration:350, curve: AnimationCurve.easeOut}});
    }
}
