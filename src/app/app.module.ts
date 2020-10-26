import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
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

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        NativeScriptModule,
        NativeScriptHttpClientModule,
    ],
    declarations: [
        AppComponent,
    ],
    providers:[
        PaymentService,
        DataService,
        CountryService,
        MerchantService,
        TransactionService,
        AuthService,
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
