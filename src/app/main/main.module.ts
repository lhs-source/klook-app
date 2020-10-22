import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";
import { NativeScriptHttpClientModule } from "@nativescript/angular/http-client";

import { MainRoutingModule } from "./main-routing.module";
import { MainComponent } from "./main.component";
import { ChangePointComponent } from "./change-point/change-point.component";
import { OnlinepayComponent } from "./onlinepay/onlinepay.component";
import { ComponentsModule } from "../components/components.module";
import { ChargeModule } from "./charge-point/charge.module";
import { ChangeModule } from "./change-point/change.module";

import { DataService } from "./data.service";
import { PaymentService } from "./payment.service";
import { AuthService } from "./auth.service";
import { HttpInterceptorService } from "./http-interceptor.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ClassProvider } from "@angular/core";

const LOGGING_INTERCEPTOR_PROVIDER: ClassProvider = {
    provide: HTTP_INTERCEPTORS ,
    useClass: HttpInterceptorService,
    multi: true
 };

@NgModule({
    exports: [
        MainComponent,
    ],
    imports: [
        NativeScriptCommonModule,
        NativeScriptHttpClientModule,
        MainRoutingModule,
        ChargeModule,
        ChangeModule,
        ComponentsModule
    ],
    declarations: [
        MainComponent,
        OnlinepayComponent,
    ],
    providers:[
        DataService,
        PaymentService,
        AuthService,
        LOGGING_INTERCEPTOR_PROVIDER,
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class MainModule { }
