
import { Injectable } from '@angular/core';
import { Couchbase } from "nativescript-couchbase-plugin";
import { getBoolean, getNumber, setBoolean, setNumber } from 'tns-core-modules/application-settings';
import { CountryService } from './country.service';
import { DataService } from './data.service';

function encode_utf8(s) {
    return unescape(encodeURIComponent(s));
}

function decode_utf8(s) {
    return decodeURIComponent(escape(s));
}

@Injectable()
export class OctopusService {
    octopus = {
        "홍콩":{
            title:"홍콩 옥토퍼스",
            balance:800,
            exchange: 151.39,
            currency:"HKD"
        },
        "싱가포르":{
            title:"싱가포르 이지링크",
            balance: 1200,
            exchange: 852.89,
            currency:"SGD"
        },
        "영국":{
            title:"영국 오이스터",
            balance: 84,
            exchange: 1467.58,
            currency:"GBP"
        }
    };
    has_octopus = false;

    constructor(
        private dataService:DataService,
        private countryService:CountryService,) { 
        this.has_octopus = getBoolean("hasOctopus", false);
        this.octopus["홍콩"].balance = getNumber("octopusHK", 800);
        this.octopus["싱가포르"].balance = getNumber("octopusSG", 1200);
        this.octopus["영국"].balance = getNumber("octopusUK", 84);
    }
    
    register_octopus(){
        this.has_octopus = true;
        setBoolean("hasOctopus", this.has_octopus);
    }
    reset(){
        this.has_octopus = false;

        setBoolean("hasOctopus", this.has_octopus);

        this.octopus["홍콩"].balance = 800;
        this.octopus["싱가포르"].balance = 1200;
        this.octopus["영국"].balance = 84;

        setNumber("octopusHK", this.octopus["홍콩"].balance);
        setNumber("octopusSG", this.octopus["싱가포르"].balance);
        setNumber("octopusUK", this.octopus["영국"].balance);

    }

    addOctopusBalance(country:string, v: number) {
        let cur_octo = this.octopus[country];
        cur_octo.balance = cur_octo.balance + v;
        // this.dataService.decreasePoint(v * this.octopus[country].exchange);

        setNumber("octopusHK", this.octopus["홍콩"].balance);
        setNumber("octopusSG", this.octopus["싱가포르"].balance);
        setNumber("octopusUK", this.octopus["영국"].balance);

        console.log("DataService addOctopusBalance octopus_balance =", cur_octo.balance);
        console.log("DataService addOctopusBalance point =", this.dataService.point);
    }
}