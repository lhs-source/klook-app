import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef, ComponentFactoryResolver } from "@angular/core";
import { Application } from "@nativescript/core";
import { LayoutBase } from "@nativescript/core/ui";
import { ModalDialogOptions, ModalDialogService } from "@nativescript/angular/modal-dialog";

import { RouterExtensions } from "@nativescript/angular/router";

import { NavDirective } from "../settings/nav.directive";
import { FeaturedComponent } from "../featured/featured.component";

// android
import { AndroidApplication, AndroidActivityBackPressedEventData } from "tns-core-modules/application";
import { isAndroid } from "tns-core-modules/platform";

@Component({
    selector: "Search",
    templateUrl: "./search.component.html",
    styleUrls: ["./search.component.scss"]
})
export class SearchComponent implements OnInit {

    // @ViewChild('testlayout', {static : true}) test : ElementRef;
    @ViewChild('navLayout', {static : true}) navLayout : ElementRef;
    
    @ViewChild(NavDirective) nav: NavDirective;


    is_qr_on = false;

    constructor(
        private routerEx : RouterExtensions, 
        private modalService: ModalDialogService,
        private componentFactoryResolver: ComponentFactoryResolver,
        private vcRef: ViewContainerRef) {
        // Use the component constructor to inject providers.
        console.log("constructor SearchComponent");
        
        if (isAndroid) {
            Application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
                console.log("back button pressed on SearchComponent");
                if(this.is_qr_on === true){
                    console.log("this.is_qr_on " + this.is_qr_on);
                    data.cancel = true;
                    // this.onTabAccount();
                    this.is_qr_on = !this.is_qr_on;
                }
            });
        }
    }

    ngOnInit(): void {
        // Init your component properties here.
        console.log("SearchComponent ngOnInit");

        // let lb = this.test.nativeElement as LayoutBase;
        // lb.translateX = 0;
        // lb.translateY = 0;
    }

    ngAfterViewInit():void{
        console.log("SearchComponent ngAfterViewInit");

        // let lb = this.test.nativeElement as LayoutBase;
        // lb.translateX = 0;
        // lb.translateY = 0;

        // console.log(lb.translateX);
        // console.log(lb.translateY);
    }

    onCardTap() : void{    
        // let navlb = this.navLayout.nativeElement as LayoutBase;
        // console.log("nav layoutbase test");
        // console.log(navlb);

        // this.routerEx.navigateByUrl("/featured")
        
		// const options: ModalDialogOptions = {
		// 	fullscreen: false,
        //     viewContainerRef: this.vcRef,
            
		// };

        // this.modalService.showModal(FeaturedComponent, options);
        console.log("onCardTap");
        console.log("this.is_qr_on " + this.is_qr_on);
        this.is_qr_on = !this.is_qr_on;

        // let fac = this.componentFactoryResolver.resolveComponentFactory(FeaturedComponent);
        // // console.log(fac);
        // console.log(this.nav);
        // let nav_view_cot = this.nav.viewContainerRef;
        // // console.log(nav_view_cot);
        // // nav_view_cot.clear();
        // let new_comp = nav_view_cot.createComponent(fac);
        // // console.log(new_comp);

    }

    onTapOutsideModal(){
        console.log("SearchComponent onTapOutsideModal");
        this.is_qr_on = !this.is_qr_on;
    }

    onTapHistory(){
        console.log("SearchComponent onTapHistory");
    }
}
