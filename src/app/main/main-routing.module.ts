import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";
import { OnlinepayComponent } from "./onlinepay/onlinepay.component";
import { ChargePointComponent } from "./charge-point/charge-point.component";
import { ChangePointComponent } from "./change-point/change-point.component";

import { TestpageComponent } from "./testpage/testpage.component";

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: "home", loadChildren: () => import("./home/home.module").then((m) => m.HomeModule) },
    { path: 'onlinepay', component: OnlinepayComponent },
    { path: 'charge-point', component: ChargePointComponent },
    { path: 'change-point', component: ChangePointComponent },
    { path: "octopus", loadChildren: () => import("./octopus/octopus.module").then((m) => m.OctopusModule) },
    { path: "tr", loadChildren: () => import("./tr/tr.module").then((m) => m.TrModule) },
    { path: "account", loadChildren: () => import("./account/account.module").then((m) => m.AccountModule) },
    
    { path: 'test', component: TestpageComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class MainRoutingModule { }