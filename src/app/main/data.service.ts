import { Injectable } from '@angular/core';
@Injectable()
export class DataService {
    point=120000;
    country="태국";
    countries={
        "태국":{
            "currency":"THB",
            "exchange":36.98,
        },
        "싱가포르":{
            "currency":"SGD",
            "exchange":852.89,
        },
        "홍콩":{
            "currency":"HKD",
            "exchange":151.39,
        },
        "말레이시아":{
            "currency":"MYR",
            "exchange":281.47,
        },
        "미국":{
            "currency":"USD",
            "exchange":1180.00,
        }
    }
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
    };
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
        "10월 30일 금요일": [
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
            }
        ],
        "10월 27일 화요일": [
            {
                icon: "포인트충전",
                merchant: "KB국민카드 Nori카드 충전",
                point: 100000,
                curr: 0,
                date: new Date(2020, 10, 27, 21, 10, 0, 0),
                description: "포인트 일반충전",
                taxfree: false,
                utu: false,
                save_point: 0,
            }
        ],
        "10월 25일 일요일": [
            {
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
            }
        ],
        "10월 24일 토요일": [
            {
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
            }
        ],
        "10월 23일 금요일": [
            {
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
            }
        ],
        "10월 20일 화요일": [
            {
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
        ],
    };
    
    addPoint(point){
        this.point = this.point + point;
        console.log("DataService ", this.point);
    }
}