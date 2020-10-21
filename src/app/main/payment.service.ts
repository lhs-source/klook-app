import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({providedIn: 'root'})
export class PaymentService {
    server_url = "https://yrkim-eval-prod.apigee.net"

    token = "NmVlNGFlNWQzYWYyNGQxZjhmYTM2YjcyOWVmNmM1OjZlZTRhZTVkM2FmMjRkMQ====";

    constructor(private httpClient: HttpClient) { }

    getToken(){
        let path = "/oauth?API%20Key=1gH8WT02XvyxvqjIg24dSKaUBHeNw59i";
        let headers = new HttpHeaders({
            "Authorization": "Basic NmVlNGFlNWQzYWYyNGQxZjhmYTM2YjcyOWVmNmM1OjZlZTRhZTVkM2FmMjRkMQ====",
            "Content-Type": "application/x-www-form-urlencoded",
         });

        return this.httpClient.post(this.server_url + path,{formData: "<string>", "API Key":"1gH8WT02XvyxvqjIg24dSKaUBHeNw59i"});
    }
}