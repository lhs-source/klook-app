import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";

import { SettingsRoutingModule } from "./settings-routing.module";
import { SettingsComponent } from "./settings.component";
import { BrowseModule } from "../browse/browse.module"
import { NavDirective } from "./nav.directive";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        SettingsRoutingModule,
        BrowseModule
    ],
    declarations: [
        SettingsComponent,
        NavDirective
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SettingsModule { }
