import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { Couchbase } from "nativescript-couchbase-plugin";
import { decode_paymentData, encode_paymentData, PaymentData } from "./payment-data.model";

import {
    getBoolean,
    setBoolean,
    getNumber,
    setNumber,
    getString,
    setString,
    hasKey,
    remove,
    clear
} from "tns-core-modules/application-settings";
import { QrData } from './qr-data.model';

function encode_utf8(s) {
    return unescape(encodeURIComponent(s));
}

function decode_utf8(s) {
    return decodeURIComponent(escape(s));
}

@Injectable()
export class DataService {
    point = 120000;
    country = "태국";
    countries_init = {
        "태국": {
            currency: "THB",
            exchange: 36.98,
        },
        "싱가포르": {
            currency: "SGD",
            exchange: 852.89,
        },
        "홍콩": {
            currency: "HKD",
            exchange: 151.39,
        },
        "말레이시아": {
            currency: "MYR",
            exchange: 281.47,
        },
        "미국": {
            currency: "USD",
            exchange: 1180.00,
        }
    }
    countries = {};
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
    icons = {
        "백화점": "~/images/ico_type2.png",
        "편의점": "~/images/ico_type3.png",
        "식당": "~/images/ico_type5.png",
        "포인트충전": "~/images/ico_type1.png",
        "마트": "~/images/ico_type4.png",
        "스포츠": "~/images/ico_type6.png",
        "카페": "~/images/ico_type7.png",
        "포인트교환": "~/images/ico_type8.png",
    };
    tr_grouped = {

    }
    tr_group_calced = false;
    trs_init: PaymentData[] = [
        {
            type: "transactions",
            class: "백화점",
            merchant: "Central Department Store (Central Hat Yai)",
            point: 25000,
            curr: 676,
            date: new Date(2020, 9, 30, 14, 23, 0, 0),
            description: "포인트사용",
            taxfree: true,
            utu: false,
            save_point: 1250,
        }, {
            type: "transactions",
            class: "편의점",
            merchant: "Family mart",
            point: 4500,
            curr: 122,
            date: new Date(2020, 9, 30, 11, 30, 0, 0),
            description: "포인트사용",
            taxfree: false,
            utu: true,
            save_point: 45,
        }, {
            type: "transactions",
            class: "포인트충전",
            merchant: "KB국민카드 Nori카드 충전",
            point: 100000,
            curr: 0,
            date: new Date(2020, 9, 27, 21, 9, 0, 0),
            description: "포인트 일반충전",
            taxfree: false,
            utu: false,
            save_point: 0,
        }, {
            type: "transactions",
            class: "마트",
            merchant: "Big C (Thap Thiang)",
            point: 5500,
            curr: 145,
            date: new Date(2020, 9, 25, 13, 9, 0, 0),
            description: "포인트사용",
            taxfree: false,
            utu: true,
            save_point: 55,
        }, {
            type: "transactions",
            class: "식당",
            merchant: "MK Restaurants",
            point: 13500,
            curr: 365,
            date: new Date(2020, 9, 25, 12, 35, 0, 0),
            description: "포인트사용",
            taxfree: false,
            utu: true,
            save_point: 135,
        }, {
            type: "transactions",
            class: "포인트충전",
            merchant: "KB국민카드 포인트 자동충전",
            point: 50000,
            curr: 0,
            date: new Date(2020, 9, 25, 9, 45, 0, 0),
            description: "포인트 자동충전",
            taxfree: false,
            utu: false,
            save_point: 0,
        }, {
            type: "transactions",
            class: "식당",
            merchant: "EATHAI",
            point: 37000,
            curr: 1001,
            date: new Date(2020, 9, 25, 18, 20, 0, 0),
            description: "포인트사용",
            taxfree: false,
            utu: true,
            save_point: 370,
        }, {
            type: "transactions",
            class: "백화점",
            merchant: "Robinson",
            point: 38000,
            curr: 1028,
            date: new Date(2020, 9, 24, 17, 24, 0, 0),
            description: "포인트사용",
            taxfree: true,
            utu: false,
            save_point: 1900,
        }, {
            type: "transactions",
            class: "마트",
            merchant: "Tops daily mini supermarket",
            point: 19000,
            curr: 324,
            date: new Date(2020, 9, 24, 13, 15, 0, 0),
            description: "포인트사용",
            taxfree: false,
            utu: true,
            save_point: 600,
        }, {
            type: "transactions",
            class: "스포츠",
            merchant: "SuperSports",
            point: 12000,
            curr: 324,
            date: new Date(2020, 9, 23, 19, 20, 0, 0),
            description: "포인트사용",
            taxfree: true,
            utu: false,
            save_point: 600,
        }, {
            type: "transactions",
            class: "카페",
            merchant: "Segafredo Zanetti Espresso",
            point: 5000,
            curr: 135,
            date: new Date(2020, 9, 23, 18, 45, 0, 0),
            description: "포인트사용",
            taxfree: false,
            utu: true,
            save_point: 50,
        }, {
            type: "transactions",
            class: "포인트충전",
            merchant: "KB국민카드 해피Nori카드 충전",
            point: 100000,
            curr: 0,
            date: new Date(2020, 9, 20, 21, 0, 0, 0),
            description: "포인트 일반충전",
            taxfree: false,
            utu: false,
            save_point: 0,
        }, {
            type: "transactions",
            class: "포인트교환",
            merchant: "KB국민카드 포인트리 교환",
            point: 20000,
            curr: 0,
            date: new Date(2020, 9, 20, 20, 50, 0, 0),
            description: "포인트교환",
            taxfree: false,
            utu: false,
            save_point: 0,
        }
    ];

    trs : PaymentData[] = [];


    database: Couchbase;
    constructor() {
        this.initialize();
    }

    initialize(){
        console.log("setting user data...");
        this.point = getNumber("point", 120000);
        this.country = getString("country", "태국");

        this.database = new Couchbase("klook");
        // get countries
        // this.database.createView("countries", "1", (document, emitter)=>{
        //     if(document.type === "country"){
        //         emitter.emit(document._id, document);
        //     }
        // });
        // let temp_countries = this.database.executeQuery("countries");
        let temp_countries = this.database.query({
            select: [],
            from: null,
            where: [{ property: 'type', comparison: 'equalTo', value: 'countries' }],
            // order: [{ property: 'firstName', direction: 'desc' }],
            // limit: 2
        });
        if (temp_countries.length === 0) {
            // create new datas
            console.log("creating new countries data...");
            for (let key in this.countries_init) {
                let item = {
                    type: "countries",
                    name: encode_utf8(key),
                    currency: this.countries_init[key].currency,
                    exchange: this.countries_init[key].exchange
                }
                // console.log("new country =>", item);
                this.countries[key] = this.countries_init[key];
                this.database.createDocument(item);
            }
        } else {
            // store in memory
            console.log("getting countries data...");
            temp_countries.forEach((elem) => {
                this.countries[decode_utf8(elem.name)] = {
                    currency: elem.currency,
                    exchange: elem.exchange,
                };
                // console.log("get country =>", this.countries[decode_utf8(elem.name)]);
            })
        }
        // for(let key in this.countries){
        //     console.log("countries[",key,"]=",this.countries[key]);
        // }

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


        let temp_transactions = this.database.query({
            select: [],
            from: null,
            where: [{ property: 'type', comparison: 'equalTo', value: 'transactions' }],
            order: [{ property: 'date', direction: 'desc' }],
            // limit: 2
        });
        console.log(temp_transactions.length);
        if (temp_transactions.length === 0) {
            // create new datas
            // type: "transactions",
            // class: "백화점",
            // merchant: "Central Department Store (Central Hat Yai)",
            // point: 25000,
            // curr: 676,
            // date: new Date(2020, 9, 30, 14, 23, 0, 0),
            // description: "포인트사용",
            // taxfree: true,
            // utu: false,
            // save_point: 1250,
            console.log("creating new transactions data...");
            this.trs_init.forEach((elem) => {
                let item = encode_paymentData(elem);
                // console.log("new transaction =>", item);
                this.trs.push(elem);
                console.log(this.database.createDocument(item));
            });
        } else {
            // store in memory
            this.trs = [];
            console.log("getting transactions data...");
            temp_transactions.forEach((elem) => {
                let item = decode_paymentData(elem);
                // console.log("get transaction =>", item);
                this.trs.push(item);
            });
        }
        // this.trs.forEach((elem)=>{
        //     console.log("trs=",elem);
        // });
    }
    reset(){
        this.resetPoint();
        this.clearTr();
        this.country = "태국";
        this.initialize();
    }

    //-------
    // point
    //-------
    addPoint(point) {
        this.point = this.point + point;
        setNumber("point", this.point);
        console.log("DataService point =", this.point);
    }
    decreasePoint(point) {
        this.point = this.point - point;
        setNumber("point", this.point);
        console.log("DataService point =", this.point);
    }
    resetPoint(){
        this.point = 120000;
    }

    //--------------
    // transactions
    //--------------
    findTrByDate(date) {
        let tr = this.trs.filter((element, index, array) => {
            return (Number(date) === element.date.getTime());
        })[0];
        return tr;
    }

    getTrsGrouped() {
        if (this.tr_group_calced === false) {
            this.tr_grouped = {};
            this.trs.forEach((elem) => {
                let date = formatDate(elem.date, 'MM월 dd일 ', 'en-US');
                let day = elem.date.getDay();
                let days = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
                date = date.concat(days[day]);
                // console.log(date);
                if (!this.tr_grouped[date]) {
                    this.tr_grouped[date] = [];
                }
                this.tr_grouped[date].push(elem);
            });
            this.tr_group_calced = true;
        };
        return this.tr_grouped;
    }
    addTr(tr: PaymentData) {
        this.database.createDocument(encode_paymentData(tr));
        this.trs.unshift(tr);
        // temp until 10/30
        this.trs.sort((a, b)=>{
            if(a.date > b.date){
                return -1;
            }else{
                return 1;
            }
        })
        this.tr_group_calced = false;
    }
    addTrFromQr(qr: QrData) {
        let tr = this.qr2tr(qr);
        this.database.createDocument(encode_paymentData(tr));
        this.trs.unshift(tr);
        // temp until 10/30
        this.trs.sort((a, b)=>{
            if(a.date > b.date){
                return -1;
            }else{
                return 1;
            }
        })
        this.tr_group_calced = false;
    }
    qr2tr(qr : QrData){
        let point = qr.amount * this.countries[this.country].exchange;
        let item = {
            type:"transactions",
            class: this.merchants[qr.merchant].class,
            merchant: qr.merchant,
            point: qr.amount * this.countries[this.country].exchange,
            curr: qr.amount,
            date: new Date(), //(2020, 10, 12, 18, 20, 0, 0),
            description: qr.description,
            taxfree: qr.taxfree,
            utu: qr.utu,
            save_point: point * 0.1,
        };
        return item;
    }
    clearTr(){
        this.trs = [];
        this.tr_group_calced = false;
        this.database.destroyDatabase();
    }
    //--------------
    // merchant
    //--------------
    getExchange() {
        return this.countries[this.country].exchange;
    }
    getCurrency() {
        return this.countries[this.country].currency;
    }

}