import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";
import { CarouselCardComponent } from "./carousel-card.component";

@NgModule({
    exports: [
        CarouselCardComponent,
    ],
    imports: [
        NativeScriptCommonModule
    ],
    declarations: [
        CarouselCardComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class CarouselCardModule { }
