import { Injectable } from '@angular/core';

import {
    getBoolean,
    setBoolean,
    getString,
    setString,
} from "tns-core-modules/application-settings";


@Injectable({providedIn: 'root'})
export class AuthService {

    // is signed up
    is_registered = false;
    // registered pin number
    pin = "";
    // deactive flag
    _is_deactive = false;
    
    get is_deactive() : boolean {
        return this._is_deactive;
    }
    
    set is_deactive(v : boolean) {
        this._is_deactive = v;
        setBoolean("isDeactive", this._is_deactive);
    }
    

    constructor() { 
        this.pin = getString("pin", "");
        this.is_registered = getBoolean("isRegistered", false);
        this.is_deactive = getBoolean("isDeactive", false);

        console.log("constructor", this.info);
    }

    reset(){
        this.is_registered = false;
        this.pin = "";
        this.is_deactive = false;
        setString("pin", this.pin);
        setBoolean("isRegistered", this.is_registered);
        setBoolean("isDeactive", this.is_deactive);
        
        console.log("reset", this.info);
    }
    
    register(){
        setString("pin", this.pin);
        this.is_registered = true;
        setBoolean("isRegistered", this.is_registered);
        
        console.log("register", this.info);
    }



    get info(){
        return 'Auth = [pin = ' + this.pin + ", is_registered = " + this.is_registered + ", is_deactive = " + this.is_deactive + ']';
    }
}