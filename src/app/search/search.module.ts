import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";

import { SearchRoutingModule } from "./search-routing.module";
import { SearchComponent } from "./search.component";
import { NgShadowModule } from "nativescript-ngx-shadow";

import { registerElement } from '@nativescript/angular/element-registry';
import { ShadowedLabel } from 'nativescript-shadowed-label';
import { FeaturedModule } from "../featured/featured.module";
import { NavDirective } from "../settings/nav.directive";


registerElement('ShadowedLabel', () => ShadowedLabel);

@NgModule({
    imports: [
        NativeScriptCommonModule,
        SearchRoutingModule,
        NgShadowModule,
        FeaturedModule
    ],
    declarations: [
        SearchComponent,
        NavDirective
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SearchModule { }
