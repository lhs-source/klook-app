import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { switchMap, tap } from 'rxjs/operators';
import { DataService } from '../service/data.service';
@Injectable({ providedIn: 'root' })
export class PaymentService {
    tag = this.constructor.name;
    server_url = "https://yrkim-eval-prod.apigee.net"

    token_type = "Basic";
    token = "NmVlNGFlNWQzYWYyNGQxZjhmYTM2YjcyOWVmNmM1OjZlZTRhZTVkM2FmMjRkMQ====";
    token_exp = 0;
    interval;

    // payment info from qr
    pay_info = {
        type:"백화점",
        merchant: "Central Department Store (Central Hat Yai)",
        amount: 419,
        point : 15500,
        description: "포인트사용",
        taxfree: false,
        utu: true,
    };

    constructor(private httpClient: HttpClient, private dataService : DataService) { }

    getToken() {
        let path = "/oauth?x-apikey=1gH8WT02XvyxvqjIg24dSKaUBHeNw59i";
        let headers = new HttpHeaders({
            "Authorization": this.token_type + " " + this.token,
            "Content-Type": "application/x-www-form-urlencoded",
        });
        return this.httpClient.post(this.server_url + path, JSON.stringify({ "formData": "<string>" }), { headers: headers })
            .pipe(
                tap(
                    response => {
                        console.log(this.tag, "getToken");
                        this.token_type = response["token_type"];
                        this.token = response["access_token"];
                        this.token_exp = response["expires_in"];

                        // go timer
                        clearInterval(this.interval);
                        this.interval = setInterval(() => {
                            if (this.token_exp > 0) {
                                this.token_exp--;
                                // console.log("this.token_exp = ", this.token_exp);
                            } else {
                                clearInterval(this.interval);
                            }
                        }, 1000);
                    })
            );
    }
    goPay() {
        let path = "/rps/payment/account?x-apikey=1gH8WT02XvyxvqjIg24dSKaUBHeNw59i";
        let headers = new HttpHeaders({
            "Authorization": this.token_type + " " + this.token,
            "Accept": "application/json",
            "Content-Type": "text/plain",
        });
        let postdata = {
            "accountFrom": {
                "customerIdType": "USERID",
                "customerId": "CUST_200000076"
            },
            "accountTo": {
                "customerIdType": "USERID",
                "customerId": "CUST_100000076"
            },
            "totalAmount": {
              "amount": String(this.pay_info.amount),
              "currency": "THB"
            },
            "transactionType": "TRANSFER"
        }
        if(this.token_exp <= 0){
            return this.getToken().pipe(
                switchMap(res => {
                    let headers = new HttpHeaders({
                        "Authorization": this.token_type + " " + this.token,
                        "Accept": "application/json",
                        "Content-Type": "text/plain",
                    });
                    return this.httpClient.post(this.server_url + path, JSON.stringify(postdata), { headers: headers })
                })
            );
        }
        return this.httpClient.post(this.server_url + path, JSON.stringify(postdata), { headers: headers })
    }
    // save a paydata
    storePayData(data){
        this.pay_info.merchant = data.merchant;
        this.pay_info.type = this.dataService.merchants[this.pay_info.merchant].type;
        this.pay_info.amount = data.amount;
        this.pay_info.point = this.pay_info.amount * this.dataService.countries[this.dataService.country].exchange;
        this.pay_info.description = data.description;
        this.pay_info.taxfree = data.taxfree;
        this.pay_info.utu = data.utu;
    }
    // clear the paydata
    clearPayData(){
        this.pay_info.type = "";
        this.pay_info.merchant = "";
        this.pay_info.amount = 0;
        this.pay_info.point = 0;
        this.pay_info.description = "";;
        this.pay_info.taxfree = false;
        this.pay_info.utu = false;
    }

    getAccounts() {
        let path = "/rps/account?x-apikey=1gH8WT02XvyxvqjIg24dSKaUBHeNw59i";
        let headers = new HttpHeaders({
            "Authorization": this.token_type + " " + this.token,
            "Accept": "application/json",
            "Content-Type": "text/plain",
        });
        let postdata = {
            "account": {
                "customerIdType": "USERID",
                "customerId": "CUST_200000076"
            }
        }
        if(this.token_exp <= 0){
            return this.getToken().pipe(
                switchMap(res => {
                    console.log("here1 =", res);
                    
                    let headers = new HttpHeaders({
                        "Authorization": this.token_type + " " + this.token,
                        "Accept": "application/json",
                        "Content-Type": "text/plain",
                    });
                    return this.httpClient.post(this.server_url + path, JSON.stringify(postdata), { headers: headers })
                })
            );
        }
        return this.httpClient.post(this.server_url + path, JSON.stringify(postdata), { headers: headers });
    }
    getTransactions() {
        let path = "/uprps/tranHistory/actions/paginatedSearch";
        let headers = new HttpHeaders({
            "Authorization": this.token_type + " " + this.token,
            "Accept": "application/json",
            "Content-Type": "text/plain",
        });
        return this.httpClient.post(this.server_url + path, JSON.stringify({ "formData": "<string>" }), { headers: headers })
            .pipe(
                tap(
                    response => {
                        console.log(response);
                        let data = response;
                        // console.log(data);
                        this.token_type = data["token_type"];
                        this.token = data["access_token"];
                        this.token_exp = data["expires_in"];
                    })
            );
    }
}