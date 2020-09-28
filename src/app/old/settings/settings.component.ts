import { Component, OnInit, ViewChild, ElementRef} from "@angular/core";
import { MapView, Marker, Position } from 'nativescript-google-maps-sdk';

@Component({
    selector: "Settings",
    templateUrl: "./settings.component.html"
})
export class SettingsComponent implements OnInit {
    // @ViewChild("MapView", {static: true}) mapView: ElementRef;
    companyMarker : Marker;


    latitude =  -33.86;
    longitude = 151.20;
    zoom = 8;
    minZoom = 0;
    maxZoom = 22;
    bearing = 0;
    tilt = 0;
    padding = [40, 40, 40, 40];
    mapView : MapView;

    lastCamera: String;

    constructor() {
    }

    //Map events
    onMapReady(event) {
        console.log('Map Ready');

        this.mapView = event.object as MapView;

        console.log("Setting a marker...");

        var marker = new Marker();
        marker.position = Position.positionFromLatLng(-33.86, 151.20);
        marker.title = "Sydney";
        marker.snippet = "Australia";
        marker.userData = {index: 1};
        this.mapView.addMarker(marker);
    }

    onCoordinateTapped(args) {
        console.log("Coordinate Tapped, Lat: " + args.position.latitude + ", Lon: " + args.position.longitude, args);
        
        var marker = new Marker();
        marker.position = Position.positionFromLatLng(args.position.latitude, args.position.longitude);
        marker.title = "Sydney";
        marker.snippet = "Australia";
        marker.userData = {index: 1};
        this.mapView.addMarker(marker);
    }

    onMarkerEvent(args) {
        console.log("Marker Event: '" + args.eventName
            + "' triggered on: " + args.marker.title
            + ", Lat: " + args.marker.position.latitude + ", Lon: " + args.marker.position.longitude, args);
    }

    onCameraChanged(args) {
        console.log("Camera changed: " + JSON.stringify(args.camera), JSON.stringify(args.camera) === this.lastCamera);
        this.lastCamera = JSON.stringify(args.camera);
    }

    onCameraMove(args) {
        console.log("Camera moving: " + JSON.stringify(args.camera));
    }

    ngOnInit(){

    }

    addmarker(){
        console.log("onmarkerSelect");

        // let maplb = this.mapView.nativeElement as MapView;
        // let marker = new Marker();

        // marker.zIndex = 100;
        
        // console.log(this.latitude);
        // console.log(this.longitude);
        // console.log(marker);
        // marker.position = Position.positionFromLatLng(this.latitude, this.longitude);
        // marker.title = "Here";
        // marker._map = maplb;
        // maplb.addMarker(this.companyMarker);
    }
}

