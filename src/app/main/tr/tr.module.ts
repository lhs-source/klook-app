import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";
import { TrRoutingModule } from "./tr.routing";
import { TrHistoryComponent } from "./tr-history/tr-history.component";
import { TrHistoryDetailComponent } from "./tr-history-detail/tr-history-detail.component";


@NgModule({
    exports:[
        TrHistoryComponent
    ],
    imports: [
        NativeScriptCommonModule,
        TrRoutingModule
    ],
    declarations: [
        TrHistoryComponent,
        TrHistoryDetailComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class TrModule { }
