import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";

import { HomeRoutingModule } from "./home.routing";
import { HomeComponent } from "./home.component";
import { QrPayComponent } from "./qr-pay/qr-pay.component";
import { QrScanComponent } from "./qr-scan/qr-scan.component";
import { TrHistoryEmbeddedComponent } from "./tr-history-embedded/tr-history-embedded.component";

@NgModule({
    exports:[
        HomeComponent,
        HomeRoutingModule
    ],
    imports: [
        NativeScriptCommonModule,
    ],
    declarations: [
        HomeComponent,
        QrPayComponent,
        QrScanComponent,
        TrHistoryEmbeddedComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class HomeModule { }
