import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class AuthService {

    // is signed up
    is_registered = true;
    // registered pin number
    pin = "333333";
    constructor() { }
    
}