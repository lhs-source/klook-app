import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";
import { CarouselCardNewComponent } from "./carousel-card-new.component";

@NgModule({
    exports: [
        CarouselCardNewComponent,
    ],
    imports: [
        NativeScriptCommonModule
    ],
    declarations: [
        CarouselCardNewComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class CarouselCardNewModule { }
