import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";

import { PinRoutingModule } from "./pin-routing.module";
import { PinRootComponent } from "./pin-root.component";
import { PinComponent } from "./pin.component";
import { NewPinComponent } from "./new-pin.component";

@NgModule({
    exports:[
        PinRootComponent
    ],
    imports: [
        NativeScriptCommonModule,
        PinRoutingModule
    ],
    declarations: [
        PinComponent,
        NewPinComponent,
        PinRootComponent,
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class PinModule { }
