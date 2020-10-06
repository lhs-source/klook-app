import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule, registerElement } from "@nativescript/angular";

// import { OctopusComponent } from "./octopus.component";
import {OctopusMainComponent} from "./octopus-main/octopus-main.component";
import {OctopusNewComponent} from "./octopus-new/octopus-new.component";
import {OctopusUseLocComponent} from "./octopus-use-loc/octopus-use-loc.component";
import {OctopusRoutingModule} from "./octopus.routing";

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
    ],
    declarations: [
        OctopusMainComponent,
        OctopusNewComponent,
        OctopusUseLocComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class OctopusModule { }
