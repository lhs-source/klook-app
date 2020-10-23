import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "@nativescript/angular";

import { AnimationCurve } from "@nativescript/core/ui/enums";
import { AuthService } from "../../service/auth.service";

@Component({
    selector: "done",
    templateUrl: "./done.component.html",
    styleUrls:["./done.component.scss"]
})
export class DoneComponent implements OnInit {
    tag = this.constructor.name;
    constructor(private routerExtensions: RouterExtensions, private route: ActivatedRoute, private authService : AuthService) {
        console.log(`${this.tag} constructor `)
    }

    ngOnInit(): void {
        console.log(`${this.tag} ngOnInit`);
        console.log(this.routerExtensions.router.url);

        this.authService.register();
    }
    onTapNext(){
        this.routerExtensions.navigate(["../../main"], {
            relativeTo: this.route, clearHistory: true, transition: {
                name: 'fade',
                duration: 250,
                curve: AnimationCurve.easeOut
            }
        });
    }
}
