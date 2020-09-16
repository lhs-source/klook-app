import { Directive, ViewContainerRef } from '@angular/core';

@Directive({ selector: '[navModal]' })
export class NavDirective {
    constructor(public viewContainerRef: ViewContainerRef) {
        console.log("NavDirective constructor");
     }
}