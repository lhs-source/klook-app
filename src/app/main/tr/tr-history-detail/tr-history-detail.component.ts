import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "@nativescript/angular";
import { AnimationCurve } from "@nativescript/core/ui/enums";
import { CustomTransitionBack } from "../../home/klook-transition";

import { MapView, Marker, Position } from 'nativescript-google-maps-sdk';

@Component({
    selector: "tr-history-detail",
    templateUrl: "./tr-history-detail.component.html",
    styleUrls: ["./tr-history-detail.component.scss"]
})
export class TrHistoryDetailComponent implements OnInit {
    tag = this.constructor.name;

    id = 0;

    trs = [
        {
            icon: "department",
            merchant: "Central Department Store",
            point: 25000,
            curr: 676,
            date: new Date(2020, 10, 30, 14, 23, 0, 0),
            description: "포인트사용",
            taxfree: true,
            utu: false,
            save_point: 1250,
        }, {
            icon: "grocery",
            merchant: "Family mart",
            point: 4500,
            curr: 122,
            date: new Date(2020, 10, 30, 11, 30, 0, 0),
            description: "포인트사용",
            taxfree: false,
            utu: true,
            save_point: 45,
        }, {
            icon: "point",
            merchant: "KB국민카드 Nori카드 충전",
            point: 100000,
            curr: 0,
            date: new Date(2020, 10, 27, 21, 10, 0, 0),
            description: "포인트 일반충전",
            taxfree: false,
            utu: false,
            save_point: 0,
        }, {
            icon: "mart",
            merchant: "Big C (Thap Thiang)",
            point: 5500,
            curr: 145,
            date: new Date(2020, 10, 25, 13, 10, 0, 0),
            description: "포인트사용",
            taxfree: false,
            utu: true,
            save_point: 55,
        }, {
            icon: "restaurant",
            merchant: "MK Restaurants",
            point: 13500,
            curr: 365,
            date: new Date(2020, 10, 25, 12, 35, 0, 0),
            description: "포인트사용",
            taxfree: false,
            utu: true,
            save_point: 135,
        }, {
            icon: "point",
            merchant: "KB국민카드 포인트 자동충전",
            point: 50000,
            curr: 0,
            date: new Date(2020, 10, 25, 9, 45, 0, 0),
            description: "포인트 자동충전",
            taxfree: false,
            utu: false,
            save_point: 0,
        }, {
            icon: "restaurant",
            merchant: "EATHAI",
            point: 37000,
            curr: 1001,
            date: new Date(2020, 10, 25, 18, 20, 0, 0),
            description: "포인트사용",
            taxfree: false,
            utu: true,
            save_point: 370,
        }, {
            icon: "department",
            merchant: "Robinson",
            point: 38000,
            curr: 1028,
            date: new Date(2020, 10, 24, 17, 24, 0, 0),
            description: "포인트사용",
            taxfree: true,
            utu: false,
            save_point: 1900,
        }, {
            icon: "mart",
            merchant: "Tops daily mini supermarket",
            point: 19000,
            curr: 324,
            date: new Date(2020, 10, 24, 13, 15, 0, 0),
            description: "포인트사용",
            taxfree: false,
            utu: true,
            save_point: 600,
        }, {
            icon: "sport",
            merchant: "SuperSports",
            point: 12000,
            curr: 324,
            date: new Date(2020, 10, 23, 19, 20, 0, 0),
            description: "포인트사용",
            taxfree: true,
            utu: false,
            save_point: 600,
        }, {
            icon: "cafe",
            merchant: "Segafredo Zanetti Espresso",
            point: 5000,
            curr: 135,
            date: new Date(2020, 10, 23, 18, 45, 0, 0),
            description: "포인트사용",
            taxfree: false,
            utu: true,
            save_point: 50,
        }, {
            icon: "point",
            merchant: "KB국민카드 해피Nori카드 충전",
            point: 100000,
            curr: 0,
            date: new Date(2020, 10, 20, 21, 0, 0, 0),
            description: "포인트 일반충전",
            taxfree: false,
            utu: false,
            save_point: 0,
        }, {
            icon: "exchange",
            merchant: "KB국민카드 포인트리 교환",
            point: 20000,
            curr: 0,
            date: new Date(2020, 10, 20, 20, 50, 0, 0),
            description: "포인트교환",
            taxfree: false,
            utu: false,
            save_point: 0,
        }
    ];
    tr = {};
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

    constructor(private routerExtensions: RouterExtensions, private activatedRoute: ActivatedRoute) {
        console.log(`${this.tag} constructor `)
    }

    ngOnInit(): void {
        console.log(`${this.tag} ngOnInit`);
        console.log(this.routerExtensions.router.url);

        console.log(this.activatedRoute.params.subscribe(params => {
            this.id = params['id'];
            console.log("id = " + this.id);


            this.tr = this.trs.filter((element, index, array) => {
                return (Number(this.id) === element.date.getTime());
            })[0];
            console.log(this.tr);
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

        console.log("Setting a marker... ", this.mapView);

        var marker = new Marker();
        marker.position = Position.positionFromLatLng(7.0057298, 100.4712895);
        marker.title = "Sydney";
        marker.snippet = "Australia";
        marker.userData = { index: 1 };
        console.log(this.mapView.addMarker(marker));
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

    navigateBack(event) {
        console.log(this.tag + " navigateChargePoint");

        this.routerExtensions.navigate(['/main/home'], { transition: { instance: new CustomTransitionBack(250, AnimationCurve.linear) } });
    }
}
