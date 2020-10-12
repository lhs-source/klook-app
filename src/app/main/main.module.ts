import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";

import { MainRoutingModule } from "./main-routing.module";
import { MainComponent } from "./main.component";
import { ChangePointComponent } from "./change-point/change-point.component";
import { ChargePointComponent } from "./charge-point/charge-point.component";
import { OnlinepayComponent } from "./onlinepay/onlinepay.component";
import { ComponentsModule } from "../components/components.module";

@NgModule({
    exports: [
        MainComponent,
    ],
    imports: [
        NativeScriptCommonModule,
        MainRoutingModule,
        ComponentsModule
    ],
    declarations: [
        MainComponent,
        ChangePointComponent,
        ChargePointComponent,
        OnlinepayComponent,
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class MainModule { }
