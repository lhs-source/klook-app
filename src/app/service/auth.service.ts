import { Injectable } from '@angular/core';

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


@Injectable({providedIn: 'root'})
export class AuthService {

    // is signed up
    is_registered = false;
    // registered pin number
    pin = "";
    // registered octopus
    has_octopus = false;
    // deactive flag
    is_deactive = false;

    constructor() { 
        this.pin = getString("pin", "");
        this.is_registered = getBoolean("isRegistered", false);
        this.has_octopus = getBoolean("hasOctopus", false);
        this.is_deactive = getBoolean("isDeactive", false);

        console.log("pin =",this.pin);
        console.log("is_registered =",this.is_registered);
        console.log("has_octopus =",this.has_octopus);
    }

    reset(){
        this.is_registered = false;
        this.pin = "";
        this.has_octopus = false;
        this.is_deactive = false;
        setString("pin", this.pin);
        setBoolean("isRegistered", this.is_registered);
        setBoolean("hasOctopus", this.has_octopus);
        setBoolean("isDeactive", this.is_deactive);
    }
    
    register(){
        setString("pin", this.pin);
        this.is_registered = true;
        setBoolean("isRegistered", this.is_registered);
        
        console.log("pin =",this.pin);
        console.log("is_registered =",this.is_registered);
        console.log("has_octopus =",this.has_octopus);
    }

    register_octopus(){
        this.has_octopus = true;
        setBoolean("hasOctopus", this.has_octopus);
    }

}