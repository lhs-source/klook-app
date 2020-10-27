import { Injectable } from '@angular/core';
import { PaymentData, decode_paymentData, encode_paymentData } from './payment-data.model';
import { Couchbase } from 'nativescript-couchbase-plugin';
import { formatDate } from '@angular/common';
import { QrData } from './qr-data.model';
import { CountryService } from './country.service';
import { MerchantService } from './merchant.service';
import { DataService } from './data.service';

@Injectable({providedIn: 'root'})
export class TransactionService {
    trs_grouped = {}
    tr_group_calced = false;
    trs_init: PaymentData[] = [
        {
            type: "transactions",
            class: "백화점",
            merchant: "Central Department Store (Central Hat Yai)",
            point: -25000,
            curr: 676,
            country:"태국",
            date: new Date(2020, 9, 30, 14, 23, 0, 0),
            description: "포인트사용",
            taxfree: true,
            utu: false,
            save_point: 1250,
        }, {
            type: "transactions",
            class: "편의점",
            merchant: "Family mart",
            point: -4500,
            curr: 122,
            country:"태국",
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
            country:"태국",
            date: new Date(2020, 9, 27, 21, 9, 0, 0),
            description: "포인트 일반충전",
            taxfree: false,
            utu: false,
            save_point: 0,
        }, {
            type: "transactions",
            class: "마트",
            merchant: "Big C (Thap Thiang)",
            point: -5500,
            curr: 145,
            country:"태국",
            date: new Date(2020, 9, 25, 13, 9, 0, 0),
            description: "포인트사용",
            taxfree: false,
            utu: true,
            save_point: 55,
        }, {
            type: "transactions",
            class: "식당",
            merchant: "MK Restaurants",
            point: -13500,
            curr: 365,
            country:"태국",
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
            country:"태국",
            date: new Date(2020, 9, 25, 9, 45, 0, 0),
            description: "포인트 자동충전",
            taxfree: false,
            utu: false,
            save_point: 0,
        }, {
            type: "transactions",
            class: "식당",
            merchant: "EATHAI",
            point: -37000,
            curr: 1001,
            country:"태국",
            date: new Date(2020, 9, 25, 18, 20, 0, 0),
            description: "포인트사용",
            taxfree: false,
            utu: true,
            save_point: 370,
        }, {
            type: "transactions",
            class: "백화점",
            merchant: "Robinson",
            point: -38000,
            curr: 1028,
            country:"태국",
            date: new Date(2020, 9, 24, 17, 24, 0, 0),
            description: "포인트사용",
            taxfree: true,
            utu: false,
            save_point: 1900,
        }, {
            type: "transactions",
            class: "마트",
            merchant: "Tops daily mini supermarket",
            point: -19000,
            curr: 324,
            country:"태국",
            date: new Date(2020, 9, 24, 13, 15, 0, 0),
            description: "포인트사용",
            taxfree: false,
            utu: true,
            save_point: 600,
        }, {
            type: "transactions",
            class: "스포츠",
            merchant: "SuperSports",
            point: -12000,
            curr: 324,
            country:"태국",
            date: new Date(2020, 9, 23, 19, 20, 0, 0),
            description: "포인트사용",
            taxfree: true,
            utu: false,
            save_point: 600,
        }, {
            type: "transactions",
            class: "카페",
            merchant: "Segafredo Zanetti Espresso",
            point: -5000,
            curr: 135,
            country:"태국",
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
            country:"태국",
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
            country:"태국",
            date: new Date(2020, 9, 20, 20, 50, 0, 0),
            description: "포인트교환",
            taxfree: false,
            utu: false,
            save_point: 0,
        }
    ];
    trs : PaymentData[] = [];
    database: Couchbase;
    
    constructor(private countryService : CountryService,
        private merchantService : MerchantService,
        private dataService : DataService) { 
        
        this.initialize();
    }

    initialize(){
        console.log("initializing...");
        this.database = new Couchbase("transaction");
        // this.database.destroyDatabase();
        // console.log("destroying transactions database...");
        // this.database = new Couchbase("transaction");
        // console.log("creating transactions database...");
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
                // console.log("get transaction =>", item.date);
                this.trs.push(item);
            });
        }
        // this.trs.forEach((elem)=>{
        //     console.log("trs=",elem);
        // });
        this.getTrsGrouped();
    }
    findTrByDate(date) {
        let tr = this.trs.filter((element, index, array) => {
            return (Number(date) === element.date.getTime());
        })[0];
        return tr;
    }

    getTrsGrouped() {
        if (this.tr_group_calced === false) {
            this.trs_grouped = {};
            this.trs.forEach((elem) => {
                let date = formatDate(elem.date, 'MM월 dd일 ', 'en-US');
                let day = elem.date.getDay();
                let days = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
                date = date.concat(days[day]);
                // console.log(date);
                if (!this.trs_grouped[date]) {
                    this.trs_grouped[date] = [];
                }
                this.trs_grouped[date].push(elem);
            });
            this.tr_group_calced = true;
        };
        return this.trs_grouped;
    }
    get tr_grouped(){
        console.log("tr_grouped ", this.tr_group_calced);
        if (this.tr_group_calced === false) {
            this.trs_grouped = {};
            this.trs.forEach((elem) => {
                let date = formatDate(elem.date, 'MM월 dd일 ', 'en-US');
                let day = elem.date.getDay();
                let days = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
                date = date.concat(days[day]);
                console.log("insert ", date);
                console.log("elem",elem.date);
                if (!this.trs_grouped[date]) {
                    this.trs_grouped[date] = [];
                }
                this.trs_grouped[date].push(elem);
            });
            this.tr_group_calced = true;
        };
        return this.trs_grouped;
    }
    addTr(tr: PaymentData) {
        tr.save_point = Math.abs(tr.save_point);
        this.database.createDocument(encode_paymentData(tr));
        this.trs.unshift(tr);
        // auto charge! 
        this.autoCharge();

        // temp until 10/30
        this.trs.sort((a, b)=>{
            if(a.date > b.date){
                return -1;
            }else{
                return 1;
            }
        })
        console.log(this.trs);
        this.tr_group_calced = false;
    }
    addTrFromQr(qr: QrData) {
        let tr = this.qr2tr(qr);
        this.addTr(tr);
    }
    qr2tr(qr : QrData){
        let point = qr.amount * this.countryService.exchange_th;
        let item = {
            type:"transactions",
            class: this.merchantService.merchants[qr.merchant].class,
            merchant: qr.merchant,
            point: -point,
            curr: qr.amount,
            country:qr.country,
            date: new Date(), //(2020, 10, 12, 18, 20, 0, 0),
            description: qr.description,
            taxfree: qr.taxfree,
            utu: qr.utu,
            save_point: Math.abs(point) * 0.1,
        };
        return item;
    }
    autoCharge(){
        console.log("autoCharge",this.dataService.point);
        console.log("autoCharge",this.dataService.auto_balance);
        if(this.dataService.point < this.dataService.auto_balance){
            this.dataService.addPoint(this.dataService.auto_amount);
            this.addTr({
                type:"transactions",
                class: "포인트충전",
                merchant: this.dataService.auto_merchant + " 자동충전",
                point: this.dataService.auto_amount,
                curr: 0,
                country:"",
                date: new Date(),
                description: "포인트자동충전",
                taxfree: false,
                utu: false,
                save_point: 0,
            });
        }
    }
    reset(){
        console.log("reseting tr...");
        this.trs = [];
        this.trs_grouped = {};
        this.tr_group_calced = false;
        this.database.destroyDatabase();
    }
}