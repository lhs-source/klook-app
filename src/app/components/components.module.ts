import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";

import { MyActionBarComponent } from './actionbar/actionbar.component';
import { RippleButtonComponent } from "./ripple-button/ripple-button.component";
import { TitleComponent } from "./title/title.component";
import { TabComponent } from "./tab/tab.component";
import { KeypadNumberComponent } from './keypad-number/keypad-number.component';
import { SimpleActionbarComponent } from './simple-actionbar/simple-actionbar.component';
import { ProgressComponent } from './progress/progress.component';
import { OctopusReadyComponent } from './octopus-ready/octopus-ready.component';

import { AbsoultePipe } from "../service/absoulte.pipe";
@NgModule({
    exports: [
        MyActionBarComponent,
        RippleButtonComponent,
        TitleComponent,
        TabComponent,
        KeypadNumberComponent,
        SimpleActionbarComponent,
        ProgressComponent,
        AbsoultePipe,
        OctopusReadyComponent
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
        SimpleActionbarComponent,
        ProgressComponent,
        AbsoultePipe,
        OctopusReadyComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ComponentsModule { }
