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
    constructor() { 
        this.pin = getString("pin", "");
        this.is_registered = getBoolean("isRegistered", false);
        this.has_octopus = getBoolean("hasOctopus", false);
    }

    reset(){
        this.is_registered = false;
        this.pin = "";
        this.has_octopus = false;
        setString("pin", this.pin);
        setBoolean("isRegistered", this.is_registered);
        setBoolean("hasOctopus", this.has_octopus);
    }
    
    register(){
        setString("pin", this.pin);
        this.is_registered = true;
        setBoolean("isRegistered", this.is_registered);
        this.has_octopus = true;
        setBoolean("hasOctopus", this.has_octopus);
    }
}