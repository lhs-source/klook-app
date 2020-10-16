import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";
import { HomeComponent } from "./home.component";
import { TrHistoryEmbeddedComponent } from "./tr-history-embedded/tr-history-embedded.component";
import { QrScanComponent } from "./qr-scan/qr-scan.component";
import { QrPayComponent } from "./qr-pay/qr-pay.component";
import { PayComponent } from "./pay/pay.component";

const routes: Routes = [
    {
        path: '', component: HomeComponent, children: [
            { path: '', redirectTo: 'tr-embedded', pathMatch : 'full'},
            { path: 'tr-embedded', component: TrHistoryEmbeddedComponent },
            { path: 'qr-scan', component: QrScanComponent },
            { path: 'qr-pay', component: QrPayComponent },
            { path: 'pay', component: PayComponent },
        ]
    },
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class HomeRoutingModule { }