import { Injectable } from '@angular/core';
import { getString, setString } from 'tns-core-modules/application-settings';
import { Couchbase } from 'nativescript-couchbase-plugin';

function encode_utf8(s) {
    return unescape(encodeURIComponent(s));
}

function decode_utf8(s) {
    return decodeURIComponent(escape(s));
}
@Injectable({providedIn: 'root'})
export class CountryService {
    countries = {
        "태국": {
            currency: "THB",
            exchange: 36.98,
            qrimage:"~/images/btn_qrpay.png",
        },
        "싱가포르": {
            currency: "SGD",
            exchange: 852.89,
            qrimage:"~/images/logo_liquidpay.png",
        },
        "홍콩": {
            currency: "HKD",
            exchange: 151.39,
            qrimage:"~/images/logo_duitnow.png",
        },
        "말레이시아": {
            currency: "MYR",
            exchange: 281.47,
            qrimage:"~/images/logo_collinson.png",
        },
        "미국": {
            currency: "USD",
            exchange: 1180.00,
            qrimage:"~/images/logo_citcon.png",
        },
        // "영국": {
        //     currency: "GBP",
        //     exchange: 1467.58,
        // }
    };
    _country = "태국"
    
    constructor() {
        this.country = getString("country", "태국");
        // this.initialize();
    }
    reset(){
        console.log("reseting countries...");
        this.country = "태국";
    }
    set country(_c){
        this._country = _c;
        setString("country", this._country);
    }
    
    get country() : string {
        return this._country;
    }
    
    get current_country() {
        return this.countries[this.country];
    }
    get exchange() {
        return this.countries[this.country].exchange;
    }
    get exchange_hk() {
        return this.countries["홍콩"].exchange;
    }
    get exchange_th() {
        return this.countries["태국"].exchange;
    }
    get currency() {
        return this.countries[this.country].currency;
    }
    get qrimage() {
        return this.countries[this.country].qrimage;
    }
}