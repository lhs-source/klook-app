import { Injectable, Component, ViewContainerRef } from "@angular/core";
import { ProgressComponent } from './progress.component';
import { ModalDialogService, ModalDialogOptions } from "@nativescript/angular";
import { ModalInterface } from './modal-interface';

@Injectable()
export class ProgressService {
    modal : ModalInterface;

    constructor(
        private modalService : ModalDialogService){
    }
    setComponent(component : ModalInterface){
        this.modal = component;
    }
    progressOn(vcf : ViewContainerRef){
        let options: ModalDialogOptions = {
            viewContainerRef: vcf,
        };
        this.modalService.showModal(ProgressComponent, options);
    }
    progressOff(){
        this.modal.closeModalDialog();
    }
}