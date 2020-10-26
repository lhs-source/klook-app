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
import { CountryService } from './country.service';

@Injectable()
export class DataService {
    point = 120000;
    _octopus_balance = 800;
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
    }

    reset() {
        this.resetPoint();
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
    resetPoint() {
        this.point = 120000;
        setNumber("point", this.point);
    }
    get point_exchanged() {
        return this.point / this.countryService.exchange;
    }

    get octopus_balance() {
        return this._octopus_balance;
    }
    set octopus_balance(v: number) {
        this._octopus_balance = v;
    }
    addOctopusBalance(v: number) {
        this._octopus_balance = this._octopus_balance + v;
    }
    setAuto(balance, amount, merchant) {
        this.auto_balance = balance;
        this.auto_amount = amount;
        this.auto_merchant = merchant;
    }
}