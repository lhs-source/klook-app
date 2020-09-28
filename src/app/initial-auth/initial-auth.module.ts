import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";

import { KlookMainComponent } from "./klookmain/klookmain.component";
import { InitialAuthRoutingModule } from "./initial-auth.routing";
import { NewPinComponent } from "./pin/new-pin.component";

@NgModule({
    exports:[
        KlookMainComponent,
        // NewPinComponent,
    ],
    imports: [
        NativeScriptCommonModule,
        InitialAuthRoutingModule
    ],
    declarations: [
        KlookMainComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class InitialAuthModule { }
