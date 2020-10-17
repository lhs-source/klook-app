import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";

import { MainRoutingModule } from "./main-routing.module";
import { MainComponent } from "./main.component";
import { ChangePointComponent } from "./change-point/change-point.component";
import { OnlinepayComponent } from "./onlinepay/onlinepay.component";
import { ComponentsModule } from "../components/components.module";
import { ChargeModule } from "./charge-point/charge.module";

import { DataService } from "./data.service";

@NgModule({
    exports: [
        MainComponent,
    ],
    imports: [
        NativeScriptCommonModule,
        MainRoutingModule,
        ChargeModule,
        ComponentsModule
    ],
    declarations: [
        MainComponent,
        ChangePointComponent,
        OnlinepayComponent,
    ],
    providers:[
        DataService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class MainModule { }
