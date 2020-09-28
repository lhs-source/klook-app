import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";

// import { OctopusComponent } from "./octopus.component";
import {OctopusMainComponent} from "./octopus-main/octopus-main.component";
import {OctopusNewComponent} from "./octopus-new/octopus-new.component";
import {OctopusUseLocComponent} from "./octopus-use-loc/octopus-use-loc.component";
import {OctopusRoutingModule} from "./octopus.routing";

@NgModule({
    exports:[
        OctopusMainComponent
    ],
    imports: [
        NativeScriptCommonModule,
        OctopusRoutingModule,
    ],
    declarations: [
        OctopusMainComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class OctopusModule { }
