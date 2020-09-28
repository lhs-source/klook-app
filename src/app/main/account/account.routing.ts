import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";
import { AccountComponent } from "./account/account.component";
import { AccountLinkComponent } from "./account-link/account-link.component";
import { PassportComponent } from "./passport/passport.component";

const routes: Routes = [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: AccountComponent },
    { path: 'link', component: AccountLinkComponent },
    { path: 'passport', component: PassportComponent }

];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class AccountRoutingModule { }