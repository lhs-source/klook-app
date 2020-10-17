import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";
import { ComponentsModule } from "../../components/components.module";

import { ChargePointComponent } from "./charge-point.component";
import { WayListComponent } from "./way-list/way-list.component";

@NgModule({
    exports: [
        ChargePointComponent
    ],
    imports: [
        NativeScriptCommonModule,
        ComponentsModule
    ],
    declarations: [
        ChargePointComponent,
        WayListComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ChargeModule { }
