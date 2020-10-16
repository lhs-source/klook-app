import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule, registerElement } from "@nativescript/angular";

import { HomeRoutingModule } from "./home.routing";
import { HomeComponent } from "./home.component";
import { QrPayComponent } from "./qr-pay/qr-pay.component";
import { QrScanComponent } from "./qr-scan/qr-scan.component";
import { TrHistoryEmbeddedComponent } from "./tr-history-embedded/tr-history-embedded.component";
import { PayComponent } from "./pay/pay.component";
import { HomeRoutingService } from "./home-routing.service";

import { BarcodeScanner } from "nativescript-barcodescanner";
registerElement("MLKitBarcodeScanner", () => require("nativescript-plugin-firebase/mlkit/barcodescanning").MLKitBarcodeScanner);

import { ComponentsModule } from "../../components/components.module";

@NgModule({
    exports:[
        HomeComponent,
        HomeRoutingModule
    ],
    imports: [
        NativeScriptCommonModule,
        ComponentsModule
    ],
    declarations: [
        HomeComponent,
        QrPayComponent,
        QrScanComponent,
        TrHistoryEmbeddedComponent,
        PayComponent
    ],
    providers:[
        BarcodeScanner,
        HomeRoutingService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class HomeModule { }
