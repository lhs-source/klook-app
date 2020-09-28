import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";
import { TrRoutingModule } from "./tr.routing";


@NgModule({
    exports:[
        
    ],
    imports: [
        NativeScriptCommonModule,
        TrRoutingModule
    ],
    declarations: [
        
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class TrModule { }
