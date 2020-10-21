import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";

import { PinComponent } from "./pin/pin.component";
import { NewPinComponent } from "./pin/new-pin.component";
import { TermsComponent } from "./terms/terms.component";
import { UserAuthComponent } from "./userauth/userauth.component";
import { KlookMainComponent } from "./klookmain/klookmain.component";

const routes: Routes = [
    // { path: '', redirectTo: '(pinoutlet:input)', pathMatch: 'full' },
    // { path: '',  },
    { path: '', redirectTo: 'pin', pathMatch: 'full' },
    { path: 'klook-main', component : KlookMainComponent },
    { path: 'terms', component: TermsComponent },
    { path: 'userauth', component: UserAuthComponent },
    { path: 'pin-new', component: NewPinComponent },
    { path: 'pin', component: PinComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class InitialAuthRoutingModule { }
