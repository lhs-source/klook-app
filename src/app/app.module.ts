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
import { OctopusService } from "./service/octopus.service";
import { ProgressService } from "./components/progress/progress.service";

import { MaskedTextFieldModule } from "nativescript-masked-text-field/angular";
import { InputMaskModule } from 'nativescript-input-mask/angular';
import { Statusbar } from "nativescript-plugin-statusbar";

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
        Statusbar,
        
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
