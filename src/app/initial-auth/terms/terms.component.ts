import { Component, OnInit } from "@angular/core";

import { RouterExtensions } from "@nativescript/angular";
import { AnimationCurve } from "@nativescript/core/ui/enums";

@Component({
    selector: "Terms",
    templateUrl: "./terms.component.html",
    styleUrls:["./terms.component.scss"]
})
export class TermsComponent implements OnInit {
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
        this.routerExtensions.navigate(['/initial-auth/userauth'], {transition : {name:'slide', duration:350, curve: AnimationCurve.easeOut}});
    }
}
