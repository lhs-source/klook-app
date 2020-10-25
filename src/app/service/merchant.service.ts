import { Injectable } from '@angular/core';
import { Couchbase } from 'nativescript-couchbase-plugin';

function encode_utf8(s) {
    return unescape(encodeURIComponent(s));
}

function decode_utf8(s) {
    return decodeURIComponent(escape(s));
}

@Injectable({ providedIn: 'root' })
export class MerchantService {

    merchants_init = {
        "Central Department Store (Central Hat Yai)": {
            class: "백화점",
            lat: 7.0057298,
            long: 100.4712895,
            address: "33 Prachathipat Road, Hat Yai, Hat Yai District, Songkhla 90110 태국",
        },
        "Family mart": {
            class: "편의점",
            lat: 8.417832,
            long: 99.9213329,
            address: "Pho Sadet, Mueang Nakhon Si Thammarat District, Nakhon Si Thammarat 80000 태국",
        },
        "Big C (Thap Thiang)": {
            class: "마트",
            lat: 13.7370533,
            long: 100.5458161,
            address: "78 Soi Sukhumvit 63, Phra Khanong Nuea, Watthana, Bangkok 10110 태국",
        },
        "MK Restaurants": {
            class: "식당",
            lat: 7.5642549,
            long: 99.6268338,
            address: "Thap Thiang, Mueang Trang District, Trang 92000 태국",
        },
        "EATHAI": {
            class: "식당",
            lat: 13.7437507,
            long: 100.5444492,
            address: "1031 Phloen Chit Rd, Lumphini, Pathum Wan District, Bangkok 10330 태국",
        },
        "Robinson": {
            class: "백화점",
            lat: 13.7379627,
            long: 100.5573337,
            address: "259 Sukhumvit Rd, Khlong Toei Nuea, Watthana, Bangkok 10110 태국",
        },
        "Tops daily mini supermarket": {
            class: "마트",
            lat: 13.7483256,
            long: 100.5634094,
            address: "New Petchaburi Rd, Bang Kapi, Huai Khwang, Krung Thep Maha Nakhon 10310 태국",
        },
        "SuperSports": {
            class: "스포츠",
            lat: 13.7578103,
            long: 100.5660056,
            address: "L3,327, Centralplaza Grand Rama 9, Ratchadaphisek Rd, Huai Khwang, Din Daeng, Bangkok 10400 태국",
        },
        "Segafredo Zanetti Espresso": {
            class: "카페",
            lat: 13.7467127,
            long: 100.537083,
            address: "centralwOrld, Rama I Rd, Pathum Wan, Pathum Wan District, Bangkok 10330 태국",
        },
        "Jaspal": {
            class: "식당",
            lat: 13.7467125,
            long: 100.5305169,
            address: "Phloen Chit Rd, Lumphini, Pathum Wan District, Bangkok 10330 태국",
        }
    };
    merchants = {};

    database: Couchbase;
    
    constructor() { 
        this.initialize();
    }

    initialize() {
        this.database = new Couchbase("merchant");
        let temp_merchants = this.database.query({
            select: [],
            from: null,
            where: [{ property: 'type', comparison: 'equalTo', value: 'merchants' }],
            // order: [{ property: 'firstName', direction: 'desc' }],
            // limit: 2
        });
        if (temp_merchants.length === 0) {
            // create new datas
            console.log("creating new merchants data...");
            for (let key in this.merchants_init) {
                let item = {
                    type: "merchants",
                    name: key,
                    lat: this.merchants_init[key].lat,
                    long: this.merchants_init[key].long,
                    address: encode_utf8(this.merchants_init[key].address),
                    class: encode_utf8(this.merchants_init[key].class),
                }
                // console.log("new merchant =>", item);
                this.merchants[key] = this.merchants_init[key];
                this.database.createDocument(item);
            }
        } else {
            // store in memory
            console.log("getting merchants data...");
            temp_merchants.forEach((elem) => {
                this.merchants[elem.name] = {
                    lat: elem.lat,
                    long: elem.long,
                    address: decode_utf8(elem.address),
                    class: decode_utf8(elem.class),
                };
                // console.log("get merchant =>", this.merchants[elem.name]);
            })
        }
        // for(let key in this.merchants){
        //     console.log("merchants[",key,"]=",this.merchants[key]);
        // }

    }
    reset(){
        console.log("reseting merchants...");
        this.database.destroyDatabase();
        this.merchants = [];
    }
}