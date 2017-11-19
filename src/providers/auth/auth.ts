import { HttpClient,HttpHeaders } from '@angular/common/http';
import {Headers, Http} from "@angular/http";

import { Injectable } from '@angular/core';
import {Storage} from "@ionic/storage";
import {JwtHelper} from "angular2-jwt";
import 'rxjs/add/operator/map';
/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  private LOGIN_URL = "https://reqres.in/api/users";
  private SIGNUP_URL = "https://reqres.in/api/register";
  private LOGOUT_URL = "http://localhost:8080/auth/logout";
  private headers = new HttpHeaders();
  
  jsonHelper = new JwtHelper();

  constructor(public http: HttpClient,public storage:Storage) {
    this.headers = this.headers.set('Content-Type', 'application/json; charset=utf-8');
  }

  login(credentials:any,successCallback,errorCallback){
    console.log("logging in"); 
    console.log(credentials) 
   this.http.post(this.LOGIN_URL, JSON.stringify(credentials),{headers:this.headers})
      .subscribe(
        data => successCallback(data),
        err => errorCallback(err)
      );
  }

  register(credentials:any){
    console.log("registering");
  }

  authSuccess(token){
      this.storage.set('token', token);
  }
}
