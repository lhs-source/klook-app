import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";

import { ChargepointComponent } from "./chargepoint.component";

@NgModule({
    exports:[
        ChargepointComponent
    ],
    imports: [
        NativeScriptCommonModule,
    ],
    declarations: [
        ChargepointComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ChargepointModule { }
