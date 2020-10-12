import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";

import { MyActionBarComponent } from './actionbar/actionbar.component';
import { RippleButtonComponent } from "./ripple-button/ripple-button.component";

@NgModule({
    exports: [
        MyActionBarComponent,
        RippleButtonComponent,
    ],
    imports: [
        NativeScriptCommonModule
    ],
    declarations: [
        MyActionBarComponent,
        RippleButtonComponent,
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ComponentsModule { }
