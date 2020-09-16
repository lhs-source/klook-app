import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";

import { OnlinepayComponent } from "./onlinepay.component";

@NgModule({
    exports:[
        OnlinepayComponent
    ],
    imports: [
        NativeScriptCommonModule,
    ],
    declarations: [
        OnlinepayComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class OnlinepayModule { }
