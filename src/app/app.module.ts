import { ClassProvider, NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "@nativescript/angular";
import { NativeScriptHttpClientModule } from "@nativescript/angular/http-client";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { AuthService } from "./service/auth.service";
import { DataService } from "./service/data.service";
import { CountryService } from "./service/country.service";
import { MerchantService } from "./service/merchant.service";
import { TransactionService } from "./service/transaction.service";
import { PaymentService } from "./service/payment.service";
import { OctopusService } from "./service/octopus.service";
import { ProgressService } from "./components/progress/progress.service";

import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpInterceptorService } from "./main/http-interceptor.service";

const LOGGING_INTERCEPTOR_PROVIDER: ClassProvider = {
    provide: HTTP_INTERCEPTORS ,
    useClass: HttpInterceptorService,
    multi: true
 };

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        NativeScriptModule,
        NativeScriptHttpClientModule,
        // InputMaskModule
    ],
    declarations: [
        AppComponent,
    ],
    providers:[
        LOGGING_INTERCEPTOR_PROVIDER,
        
        PaymentService,
        DataService,
        CountryService,
        MerchantService,
        TransactionService,
        AuthService,
        ProgressService,
        OctopusService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
