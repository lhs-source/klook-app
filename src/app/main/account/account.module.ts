import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";
import { AccountRoutingModule } from "./account.routing";
import { AccountComponent } from "./account/account.component";
import { AccountLinkComponent } from "./account-link/account-link.component";
import { PassportComponent } from "./passport/passport.component";

@NgModule({
    exports: [

    ],
    imports: [
        NativeScriptCommonModule,
        AccountRoutingModule
    ],
    declarations: [
        AccountComponent,
        AccountLinkComponent,
        PassportComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AccountModule { }
