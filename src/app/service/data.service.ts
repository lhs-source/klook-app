
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
    };
    // under
    auto_balance = 0;
    // charge
    auto_amount = 0;
    // merchant
    auto_merchant = "";

    constructor(private countryService: CountryService) {
        this.point = getNumber("point", 120000);
        this.auto_balance = getNumber("autoBalance", 0);
        this.auto_amount = getNumber("autoAmount", 0);
        this.auto_merchant = getString("autoMerchange", "KB국민카드 해피nori");
    }

    reset() {
        this.resetPoint();
    }

    //-------
    // point
    //-------
    addPoint(point) {
        console.log("DataService input =", point);
        this.point = this.point + point;
        setNumber("point", this.point);
        console.log("DataService point =", this.point);
    }
    decreasePoint(point) {
        this.point = this.point - point;
        setNumber("point", this.point);
        console.log("DataService point =", this.point);
    }
    resetPoint() {
        this.point = 120000;
        setNumber("point", this.point);
    }
    get point_exchanged() {
        return this.point / this.countryService.exchange;
    }
    setAuto(balance, amount, merchant) {
        console.log(this.auto_balance, this.auto_amount, this.auto_merchant);
        this.auto_balance = balance;
        this.auto_amount = amount;
        this.auto_merchant = merchant;

        setNumber("autoBalance", this.auto_balance);
        setNumber("autoAmount", this.auto_amount);
        setString("autoMerchange", this.auto_merchant);
    }
}