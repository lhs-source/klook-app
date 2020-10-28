
import { Injectable } from '@angular/core';
import {
    getNumber,
    setNumber,
    getString,
    setString,
} from "tns-core-modules/application-settings";
import { CountryService } from './country.service';

@Injectable()
export class DataService {
    point = 120000;
    icons = {
        "백화점": "~/images/ico_type2.png",
        "편의점": "~/images/ico_type3.png",
        "식당": "~/images/ico_type5.png",
        "포인트충전": "~/images/ico_type1.png",
        "마트": "~/images/ico_type4.png",
        "스포츠": "~/images/ico_type6.png",
        "카페": "~/images/ico_type7.png",
        "포인트교환": "~/images/ico_type8.png",
        "교통카드충전": "~/images/ico_type1.png",
    };
    // under
    auto_balance = 0;
    // charge
    auto_amount = 0;
    // merchant
    auto_merchant = "";
    

    // pointry
    pointry=[
        {
            img:"~/images/img_kbcard.png",
            title:"KB국민카드 포인트리",
            balance: 2000000,
            exchange:1,
            selected:true,
        },
        {
            img:"~/images/img_asiana.png",
            title:"아시아나항공 마일리지",
            balance: 3200000,
            exchange:20/13,
            selected:false,
        },
        {
            img:"~/images/img_jeju.png",
            title:"제주항공 마일리지",
            balance: 4800000,
            exchange:3/2,
            selected:false,
        }
    ];
    cards=[
        {
            img:"~/images/img_kbcard.png",
            title:"KB국민카드 해피nori",
            number:"9445-****-****-****",
            balance: 1800000,
        }
    ];
    banks=[
        {
            img:"~/images/ico_kbcard_small.png",
            title:"국민은행",
            number:"1002-**-***031",
            balance: 3600000,
        },
        {
            img:"~/images/ico_shcard_small.png",
            title:"신한은행",
            number:"3123-**-****932",
            balance: 2400000,
        }
    ];
    selected_pointry : any = {};
    selected_way : any = {};

    constructor(private countryService: CountryService) {
        this.point = getNumber("point", 120000);
        this.auto_balance = getNumber("autoBalance", 0);
        this.auto_amount = getNumber("autoAmount", 0);
        this.auto_merchant = getString("autoMerchange", "KB국민카드 해피nori");
        
        // point methods
        this.pointry[0].balance = getNumber("pointryKB", 2000000);
        this.pointry[1].balance = getNumber("pointryAsiana", 3200000);
        this.pointry[2].balance = getNumber("pointryJeju", 4800000);

        this.cards[0].balance = getNumber("cardKB", 2000000);
        
        this.banks[0].balance = getNumber("bankKB", 2400000);
        this.banks[1].balance = getNumber("shinhanKB", 3600000);

        this.selected_pointry = this.pointry[0];
        this.selected_way = this.cards[0];
    }

    reset() {
        this.resetPoint();
    }

    //-------
    // point
    //-------
    addPoint(point) {
        this.point = this.point + point;
        this.savePoint();
        console.log("DataService point =", this.point);
    }
    decreasePoint(point) {
        this.point = this.point - point;
        this.savePoint();
        console.log("DataService point =", this.point);
    }
    resetPoint() {
        this.point = 120000;
        this.savePoint();
    }
    get point_exchanged() {
        return this.point / this.countryService.exchange;
    }
    setAuto(balance, amount, merchant) {
        this.auto_balance = balance;
        this.auto_amount = amount;
        this.auto_merchant = merchant;

        console.log(this.auto_balance, this.auto_amount, this.auto_merchant);
        this.savePoint();
    }
    
    decreasePointry(point){
        this.selected_pointry.balance = this.selected_pointry.balance - point;
        console.log("DataService card point =", this.selected_pointry.balance);
        this.savePoint();
    }
    decreaseWay(point){
        this.selected_way.balance = this.selected_way.balance - point;
        console.log("DataService card point =", this.selected_way.balance);
        this.savePoint();
    }
    savePoint(){
        setNumber("point", this.point);
        
        setNumber("autoBalance", this.auto_balance);
        setNumber("autoAmount", this.auto_amount);
        setString("autoMerchange", this.auto_merchant);
        
        setNumber("pointryKB", this.pointry[0].balance);
        setNumber("pointryAsiana", this.pointry[1].balance);
        setNumber("pointryJeju", this.pointry[2].balance);

        setNumber("cardKB", this.cards[0].balance);
        
        setNumber("bankKB", this.banks[0].balance);
        setNumber("shinhanKB", this.banks[1].balance);
    }
}