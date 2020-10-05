import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";
import { HomeComponent } from "./home/home.component";
import { OnlinepayComponent } from "./onlinepay/onlinepay.component";
import { ChargePointComponent } from "./charge-point/charge-point.component";
import { ChangePointComponent } from "./change-point/change-point.component";

import {TrHistoryEmbeddedComponent} from "./home/tr-history-embedded/tr-history-embedded.component";
import { QrScanComponent } from "./home/qr-scan/qr-scan.component";
import { QrPayComponent } from "./home/qr-pay/qr-pay.component";

const routes: Routes = [
    { path: '', redirectTo: 'octopus', pathMatch: 'full' },
    // { path: 'home', component: HomeComponent , children: [
    //     { path: '', redirectTo: 'tr-embedded', pathMatch: 'full' },
    //     { path: 'tr-embedded', component: TrHistoryEmbeddedComponent },
    //     { path: 'qr-scan', component: QrScanComponent },
    //     { path: 'qr-pay', component: QrPayComponent },
    // ]},
    { path: "home", loadChildren: () => import("./home/home.module").then((m) => m.HomeModule) },
    { path: 'onlinepay', component: OnlinepayComponent },
    { path: 'charge-point', component: ChargePointComponent },
    { path: 'change-point', component: ChangePointComponent },
    { path: "octopus", loadChildren: () => import("./octopus/octopus.module").then((m) => m.OctopusModule) },
    { path: "tr", loadChildren: () => import("./tr/tr.module").then((m) => m.TrModule) },
    { path: "account", loadChildren: () => import("./account/account.module").then((m) => m.AccountModule) },
    // { path: "qr", loadChildren: () => import("./hom").then((m) => m.OctopusModule) },

];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class MainRoutingModule { }