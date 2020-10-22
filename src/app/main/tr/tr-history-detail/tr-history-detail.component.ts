import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "@nativescript/angular";
import { AnimationCurve } from "@nativescript/core/ui/enums";
import { CustomTransitionBack } from "../../../util/klook-transition";

import { MapView, Marker, Position } from 'nativescript-google-maps-sdk';
import { DataService } from "../../../service/data.service";

@Component({
    selector: "tr-history-detail",
    templateUrl: "./tr-history-detail.component.html",
    styleUrls: ["./tr-history-detail.component.scss"]
})
export class TrHistoryDetailComponent implements OnInit {
    tag = this.constructor.name;

    id = 0;

    tr = {};
    mer = {};
    currency = "THB"

    // google map
    latitude =  7.0057298;
    longitude = 100.4712895;
    zoom = 16;
    minZoom = 0;
    maxZoom = 22;
    bearing = 0;
    tilt = 0;
    padding = [40, 40, 40, 40];
    mapView : MapView;
    lastCamera: String;

    constructor(private routerExtensions: RouterExtensions,
         private activatedRoute: ActivatedRoute,
         private dataService : DataService) {
        console.log(`${this.tag} constructor `)
    }

    ngOnInit(): void {
        console.log(`${this.tag} ngOnInit`);
        console.log(this.routerExtensions.router.url);

        console.log(this.activatedRoute.params.subscribe(params => {
            this.id = params['id'];
            console.log("id = " + this.id);


            this.tr = this.dataService.findTrByDate(this.id);
            console.log(this.tr);

            // set lat / long of merchant
            this.mer = this.dataService.merchants[this.tr["merchant"]];
            if(this.mer){
                this.latitude = this.mer["lat"];
                this.longitude = this.mer["long"];
            }
        }));
    }
    addMarker(){
        var marker = new Marker();
        marker.position = Position.positionFromLatLng(this.latitude, this.longitude);
        marker.title = "Sydney";
        marker.snippet = "Australia";
        marker.userData = { index: 1 };
        console.log(this.mapView.addMarker(marker));

        this.mapView.findMarker((mark)=>{
            console.log(mark);
            return true;
        });
    }
    //Map events
    onMapReady(event) {
        console.log('Map Ready');

        this.mapView = event.object as MapView;
        this.mapView.clear();

        console.log("Setting a marker... ", this.mapView);

        if(this.mer){
            var marker = new Marker();
            marker.position = Position.positionFromLatLng(this.latitude, this.longitude);
            marker.title = this.tr["merchant"];
            marker.snippet = this.mer["address"];
            marker.userData = { index: 1 };
            this.mapView.addMarker(marker);
        }
    }
    onCoordinateTapped(args) {
        console.log("Coordinate Tapped, Lat: " + args.position.latitude + ", Lon: " + args.position.longitude, args);
        
        // var marker = new Marker();
        // marker.position = Position.positionFromLatLng(args.position.latitude, args.position.longitude);
        // marker.title = "Sydney";
        // marker.snippet = "Australia";
        // marker.userData = {index: 1};
        // this.mapView.addMarker(marker);
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

    // actionbar emit click close
    actionbar_click_close(isclose) {
        console.log(this.tag + " actionbar close button clicked = " + isclose);

        this.routerExtensions.navigate(['/main/home'], { clearHistory:true, transition: { instance : new CustomTransitionBack(250, AnimationCurve.linear) } });
    }
    navigateBack(event) {
        console.log(this.tag + " navigateChargePoint");

        this.routerExtensions.navigate(['/main/home'], { transition: { instance: new CustomTransitionBack(250, AnimationCurve.linear) } });
    }
}
