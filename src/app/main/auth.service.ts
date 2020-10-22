import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class AuthService {

    is_registered = true;
    pin = "333333";
    constructor() { }
    
}