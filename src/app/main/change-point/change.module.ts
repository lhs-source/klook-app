import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";
import { ComponentsModule } from "../../components/components.module";

import { ChangePointComponent } from "./change-point.component";
import { PointListComponent } from "./point-list/point-list.component";

@NgModule({
    exports: [
        ChangePointComponent
    ],
    imports: [
        NativeScriptCommonModule,
        ComponentsModule
    ],
    declarations: [
        ChangePointComponent,
        PointListComponent,
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ChangeModule { }
