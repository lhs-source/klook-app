import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";

import { MyActionBarComponent } from './actionbar/actionbar.component';
import { RippleButtonComponent } from "./ripple-button/ripple-button.component";
import { TitleComponent } from "./title/title.component";
import { TabComponent } from "./tab/tab.component";
import { KeypadNumberComponent } from './keypad-number/keypad-number.component';

@NgModule({
    exports: [
        MyActionBarComponent,
        RippleButtonComponent,
        TitleComponent,
        TabComponent,
        KeypadNumberComponent,
    ],
    imports: [
        NativeScriptCommonModule
    ],
    declarations: [
        MyActionBarComponent,
        RippleButtonComponent,
        TitleComponent,
        TabComponent,
        KeypadNumberComponent,
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ComponentsModule { }
