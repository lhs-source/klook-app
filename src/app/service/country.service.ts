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
    _country = "태국"

    database: Couchbase;
    
    constructor() {
        this.country = getString("country", "태국");
        this.initialize();
    }

    initialize(){
        this.database = new Couchbase("country");
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
    }
    reset(){
        console.log("reseting countries...");
        this.database.destroyDatabase();
        this.country = "태국";
        this.countries = [];
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
}