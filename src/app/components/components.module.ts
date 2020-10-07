import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";

import { MyActionBarComponent } from './actionbar/actionbar.component';

@NgModule({
    exports: [
        MyActionBarComponent,
    ],
    imports: [
        NativeScriptCommonModule
    ],
    declarations: [
        MyActionBarComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ComponentsModule { }
