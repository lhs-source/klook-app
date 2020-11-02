import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";

import { MainRoutingModule } from "./main-routing.module";
import { MainComponent } from "./main.component";
import { OnlinepayComponent } from "./onlinepay/onlinepay.component";
import { ComponentsModule } from "../components/components.module";
import { ChargeModule } from "./charge-point/charge.module";
import { ChangeModule } from "./change-point/change.module";

import { HttpInterceptorService } from "./http-interceptor.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ClassProvider } from "@angular/core";



@NgModule({
    exports: [
        MainComponent,
    ],
    imports: [
        NativeScriptCommonModule,
        MainRoutingModule,
        ChargeModule,
        ChangeModule,
        ComponentsModule,
    ],
    declarations: [
        MainComponent,
        OnlinepayComponent,
    ],
    providers:[
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class MainModule { }
