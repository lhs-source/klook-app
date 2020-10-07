import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule, registerElement, ActionBarComponent } from "@nativescript/angular";

// import { OctopusComponent } from "./octopus.component";
import {OctopusMainComponent} from "./octopus-main/octopus-main.component";
import {OctopusNewComponent} from "./octopus-new/octopus-new.component";
import {OctopusUseLocComponent} from "./octopus-use-loc/octopus-use-loc.component";
import {OctopusRoutingModule} from "./octopus.routing";

import { ComponentsModule } from "../../components/components.module";

import { Carousel, CarouselItem } from "nativescript-carousel";
registerElement('Carousel', () => Carousel);
registerElement('CarouselItem', () => CarouselItem);

@NgModule({
    exports:[
        OctopusMainComponent
    ],
    imports: [
        NativeScriptCommonModule,
        OctopusRoutingModule,
        ComponentsModule
    ],
    declarations: [
        OctopusMainComponent,
        OctopusNewComponent,
        OctopusUseLocComponent,
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class OctopusModule { }
