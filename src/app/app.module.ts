import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "@nativescript/angular";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { AuthService } from "./service/auth.service";
import { DataService } from "./service/data.service";
import { CountryService } from "./service/country.service";
import { MerchantService } from "./service/merchant.service";
import { TransactionService } from "./service/transaction.service";
@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        NativeScriptModule,
    ],
    declarations: [
        AppComponent,
    ],
    providers:[
        
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
