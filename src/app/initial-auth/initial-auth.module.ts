import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";

import { InitialAuthRoutingModule } from "./initial-auth.routing";
import { KlookMainComponent } from "./klookmain/klookmain.component";
import { PinComponent } from "./pin/pin.component";
import { NewPinComponent } from "./pin/new-pin.component";
import { TermsComponent } from "./terms/terms.component";
import { UserAuthComponent } from "./userauth/userauth.component";
import { DoneComponent } from "./done/done.component";

import { ComponentsModule } from "../components/components.module";
import { AuthService } from "../main/auth.service";

@NgModule({
    exports: [
        KlookMainComponent,
        // NewPinComponent,
    ],
    imports: [
        NativeScriptCommonModule,
        InitialAuthRoutingModule,
        ComponentsModule
    ],
    declarations: [
        KlookMainComponent,
        PinComponent,
        NewPinComponent,
        TermsComponent,
        UserAuthComponent,
        DoneComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class InitialAuthModule { }
