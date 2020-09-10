import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule, registerElement } from "@nativescript/angular";

import { FeaturedRoutingModule } from "./featured-routing.module";
import { FeaturedComponent } from "./featured.component";

// import { registerElement } from "@nativescript/angular/";
import { BarcodeScanner } from "nativescript-barcodescanner";
registerElement("BarcodeScanner", () => require("nativescript-barcodescanner").BarcodeScannerView);

@NgModule({
    imports: [
        NativeScriptCommonModule,
        FeaturedRoutingModule
    ],
    declarations: [
        FeaturedComponent
    ],
    providers:[
        BarcodeScanner,
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class FeaturedModule { }
