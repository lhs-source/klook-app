import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'; // fancy pipe-able operators

@Injectable({providedIn: 'root'})
export class HttpInterceptorService implements HttpInterceptor {
    islogon = false;
    constructor() { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("request header");
        request.headers.keys().forEach((elem)=>{
            console.log(elem,"=>",request.headers.get(elem));
        })
        return next.handle(request).pipe(
           tap(
            //    response => console.log("Oh boy we got an answer =", response), 
               response => {}, 
            //    error => console.log("Something might be burning back there =",error)
               error => {}
           ));
      }
}