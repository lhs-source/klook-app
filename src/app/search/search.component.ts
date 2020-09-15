import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef } from "@angular/core";
import { Application } from "@nativescript/core";
import { LayoutBase } from "@nativescript/core/ui";
import { RouterExtensions } from "@nativescript/angular/router";
import { ModalDialogOptions, ModalDialogService } from "@nativescript/angular/modal-dialog";
import { FeaturedComponent } from "../featured/featured.component";

@Component({
    selector: "Search",
    templateUrl: "./search.component.html",
    styleUrls: ["./search.component.scss"]
})
export class SearchComponent implements OnInit {

    @ViewChild('navLayout', {static : true}) navLayout : ElementRef;
    constructor(
        private routerEx : RouterExtensions, 
        private modalService: ModalDialogService,
        private vcRef: ViewContainerRef) {
        // Use the component constructor to inject providers.
        console.log("constructor SearchComponent");
    }

    ngOnInit(): void {
        // Init your component properties here.
        console.log("ngOnInit SearchComponent");
    }

    onCardTap() : void{    
        // let navlb = this.navLayout.nativeElement as LayoutBase;
        // console.log("nav layoutbase test");
        // console.log(navlb);

        // this.routerEx.navigateByUrl("/featured")
        
		const options: ModalDialogOptions = {
			fullscreen: false,
            viewContainerRef: this.vcRef,
            
		};

        this.modalService.showModal(FeaturedComponent, options);
    }

}
