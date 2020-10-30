import { Injectable, Component, ViewContainerRef } from "@angular/core";
import { ProgressComponent } from './progress.component';
import { ModalDialogService, ModalDialogOptions } from "@nativescript/angular";
import { ModalInterface } from './modal-interface';

@Injectable()
export class ProgressService {
    modal : ModalInterface;

    interval : any;

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

        this.interval = setInterval(()=>{
            this.modal.closeModalDialog();
        }, 10000);
    }
    progressOff(){
        clearInterval(this.interval);
        this.modal.closeModalDialog();
    }
}