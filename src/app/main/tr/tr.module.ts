import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule, registerElement } from "@nativescript/angular";
import { TrRoutingModule } from "./tr.routing";
import { TrHistoryComponent } from "./tr-history/tr-history.component";
import { TrHistoryDetailComponent } from "./tr-history-detail/tr-history-detail.component";

import { ComponentsModule } from "../../components/components.module";
import { TrListComponent } from './tr-list/tr-list.component';

registerElement("MapView", () => require("nativescript-google-maps-sdk").MapView);

@NgModule({
    exports:[
        TrHistoryComponent,
    ],
    imports: [
        NativeScriptCommonModule,
        TrRoutingModule,
        ComponentsModule
    ],
    declarations: [
        TrHistoryComponent,
        TrHistoryDetailComponent,
        TrListComponent,
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class TrModule { }
