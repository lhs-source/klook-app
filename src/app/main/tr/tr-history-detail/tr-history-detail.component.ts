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

    merchants={
        "Central Department Store (Central Hat Yai)":{
            "lat":7.0057298,
            "long":100.4712895,
            "address":"33 Prachathipat Road, Hat Yai, Hat Yai District, Songkhla 90110 태국",
        },
        "Family mart":{
            "lat":8.417832,
            "long":99.9213329,
            "address":"Pho Sadet, Mueang Nakhon Si Thammarat District, Nakhon Si Thammarat 80000 태국",
        },
        "Big C (Thap Thiang)":{
            "lat":13.7370533,
            "long":100.5458161,
            "address":"78 Soi Sukhumvit 63, Phra Khanong Nuea, Watthana, Bangkok 10110 태국",
        },
        "MK Restaurants":{
            "lat":7.5642549,
            "long":99.6268338,
            "address":"Thap Thiang, Mueang Trang District, Trang 92000 태국",
        },
        "EATHAI":{
            "lat":13.7437507,
            "long":100.5444492,
            "address":"1031 Phloen Chit Rd, Lumphini, Pathum Wan District, Bangkok 10330 태국",
        },
        "Robinson":{
            "lat":13.7379627,
            "long":100.5573337,
            "address":"259 Sukhumvit Rd, Khlong Toei Nuea, Watthana, Bangkok 10110 태국",
        },
        "Tops daily mini supermarket":{
            "lat":13.7483256,
            "long":100.5634094,
            "address":"New Petchaburi Rd, Bang Kapi, Huai Khwang, Krung Thep Maha Nakhon 10310 태국",
        },
        "SuperSports":{
            "lat":13.7578103,
            "long":100.5660056,
            "address":"L3,327, Centralplaza Grand Rama 9, Ratchadaphisek Rd, Huai Khwang, Din Daeng, Bangkok 10400 태국",
        },
        "Segafredo Zanetti Espresso":{
            "lat":13.7467127,
            "long":100.537083,
            "address":"centralwOrld, Rama I Rd, Pathum Wan, Pathum Wan District, Bangkok 10330 태국",
        },
        "Jaspal":{
            "lat":13.7467125,
            "long":100.5305169,
            "address":"Phloen Chit Rd, Lumphini, Pathum Wan District, Bangkok 10330 태국",
        }
    }
    trs = [
        {
            icon: "백화점",
            merchant: "Central Department Store (Central Hat Yai)",
            point: 25000,
            curr: 676,
            date: new Date(2020, 10, 30, 14, 23, 0, 0),
            description: "포인트사용",
            taxfree: true,
            utu: false,
            save_point: 1250,
        }, {
            icon: "편의점",
            merchant: "Family mart",
            point: 4500,
            curr: 122,
            date: new Date(2020, 10, 30, 11, 30, 0, 0),
            description: "포인트사용",
            taxfree: false,
            utu: true,
            save_point: 45,
        }, {
            icon: "포인트충전",
            merchant: "KB국민카드 Nori카드 충전",
            point: 100000,
            curr: 0,
            date: new Date(2020, 10, 27, 21, 10, 0, 0),
            description: "포인트 일반충전",
            taxfree: false,
            utu: false,
            save_point: 0,
        }, {
            icon: "마트",
            merchant: "Big C (Thap Thiang)",
            point: 5500,
            curr: 145,
            date: new Date(2020, 10, 25, 13, 10, 0, 0),
            description: "포인트사용",
            taxfree: false,
            utu: true,
            save_point: 55,
        }, {
            icon: "식당",
            merchant: "MK Restaurants",
            point: 13500,
            curr: 365,
            date: new Date(2020, 10, 25, 12, 35, 0, 0),
            description: "포인트사용",
            taxfree: false,
            utu: true,
            save_point: 135,
        }, {
            icon: "포인트충전",
            merchant: "KB국민카드 포인트 자동충전",
            point: 50000,
            curr: 0,
            date: new Date(2020, 10, 25, 9, 45, 0, 0),
            description: "포인트 자동충전",
            taxfree: false,
            utu: false,
            save_point: 0,
        }, {
            icon: "식당",
            merchant: "EATHAI",
            point: 37000,
            curr: 1001,
            date: new Date(2020, 10, 25, 18, 20, 0, 0),
            description: "포인트사용",
            taxfree: false,
            utu: true,
            save_point: 370,
        }, {
            icon: "백화점",
            merchant: "Robinson",
            point: 38000,
            curr: 1028,
            date: new Date(2020, 10, 24, 17, 24, 0, 0),
            description: "포인트사용",
            taxfree: true,
            utu: false,
            save_point: 1900,
        }, {
            icon: "마트",
            merchant: "Tops daily mini supermarket",
            point: 19000,
            curr: 324,
            date: new Date(2020, 10, 24, 13, 15, 0, 0),
            description: "포인트사용",
            taxfree: false,
            utu: true,
            save_point: 600,
        }, {
            icon: "스포츠",
            merchant: "SuperSports",
            point: 12000,
            curr: 324,
            date: new Date(2020, 10, 23, 19, 20, 0, 0),
            description: "포인트사용",
            taxfree: true,
            utu: false,
            save_point: 600,
        }, {
            icon: "카페",
            merchant: "Segafredo Zanetti Espresso",
            point: 5000,
            curr: 135,
            date: new Date(2020, 10, 23, 18, 45, 0, 0),
            description: "포인트사용",
            taxfree: false,
            utu: true,
            save_point: 50,
        }, {
            icon: "포인트충전",
            merchant: "KB국민카드 해피Nori카드 충전",
            point: 100000,
            curr: 0,
            date: new Date(2020, 10, 20, 21, 0, 0, 0),
            description: "포인트 일반충전",
            taxfree: false,
            utu: false,
            save_point: 0,
        }, {
            icon: "포인트교환",
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

            // set lat / long of merchant
            this.mer = this.merchants[this.tr["merchant"]];
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

    navigateBack(event) {
        console.log(this.tag + " navigateChargePoint");

        this.routerExtensions.navigate(['/main/home'], { transition: { instance: new CustomTransitionBack(250, AnimationCurve.linear) } });
    }
}
