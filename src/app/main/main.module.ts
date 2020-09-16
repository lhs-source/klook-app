import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";

import { MainRoutingModule } from "./main-routing.module";
import { MainComponent } from "./main.component";

import { AccountModule } from "../account/account.module";
import { FeaturedModule } from "../featured/featured.module";

@NgModule({
    exports:[
        MainComponent,
        MainRoutingModule
    ],
    imports: [
        NativeScriptCommonModule,
        AccountModule,
        // FeaturedModule
    ],
    declarations: [
        MainComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class MainModule { }
