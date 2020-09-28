import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";
import { AccountRoutingModule } from "./account.routing";

@NgModule({
    exports:[
        
    ],
    imports: [
        NativeScriptCommonModule,
        AccountRoutingModule
    ],
    declarations: [
        
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AccountModule { }
