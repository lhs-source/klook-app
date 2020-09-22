import { Component, OnInit, ViewChild, ElementRef} from "@angular/core";
import { MapView, Marker, Position } from 'nativescript-google-maps-sdk';

@Component({
    selector: "Settings",
    templateUrl: "./settings.component.html"
})
export class SettingsComponent implements OnInit {
    @ViewChild("MapView", {static: true}) mapView: ElementRef;

    constructor() {

        console.log("constructor SettingsComponent");
    }

    ngOnInit(): void {
        console.log("ngOnInit SettingsComponent");
        
    }

    ngAfterViewInit():void{
        console.log("ngAfterViewInit SettingsComponent");

    }
    
    // Google Map events
    onMapReady = (event) => {
        console.log("Map Ready");
        
        let maplb = this.mapView.nativeElement as MapView;
        let NA_CENTER_LATITUDE = 37.565785;
        let NA_CENTER_LONGITUDE = 126.976863;
        maplb.latitude = NA_CENTER_LATITUDE;
        maplb.longitude = NA_CENTER_LONGITUDE;
        maplb.zoom = 16;

        let companyMarker = new Marker();
        companyMarker.position = Position.positionFromLatLng(NA_CENTER_LATITUDE, NA_CENTER_LONGITUDE);
        companyMarker.title = "My Company";
        companyMarker.snippet = "Description here";
        companyMarker.color = "#6B8E23";
        console.log(companyMarker);
        console.log(companyMarker.position.latitude);
        console.log(companyMarker.position.longitude);
        console.log(companyMarker.visible);
        maplb.addMarker(companyMarker);
        console.log(maplb);
    };

    onmarkerSelect = (event) =>{
        console.log("onmarkerSelect");
    }
    
}

