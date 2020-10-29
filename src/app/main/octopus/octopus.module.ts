import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule, registerElement, ActionBarComponent } from "@nativescript/angular";

// import { OctopusComponent } from "./octopus.component";
import { OctopusMainComponent } from "./octopus-main/octopus-main.component";
import { OctopusChargeComponent } from "./octopus-charge/octopus-charge.component";
import { OctopusNewComponent } from "./octopus-new/octopus-new.component";
import { OctopusUseLocComponent } from "./octopus-use-loc/octopus-use-loc.component";
import { OctopusRoutingModule } from "./octopus.routing";

import { ComponentsModule } from "../../components/components.module";
import { CarouselCardModule } from "../../components/carousel-card/carousel-card.module";
import { CarouselCardNewModule } from "../../components/carousel-card-new/carousel-card-new.module";

import { Carousel, CarouselItem } from "nativescript-carousel";
registerElement('Carousel', () => Carousel);
registerElement('CarouselItem', () => CarouselItem);

@NgModule({
    exports: [
        OctopusMainComponent
    ],
    imports: [
        NativeScriptCommonModule,
        OctopusRoutingModule,
        ComponentsModule,
        CarouselCardModule,
        CarouselCardNewModule
    ],
    declarations: [
        OctopusMainComponent,
        OctopusChargeComponent,
        OctopusNewComponent,
        OctopusUseLocComponent,
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class OctopusModule { }
