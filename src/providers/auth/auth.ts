import { HttpClient } from '@angular/common/http';
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
  private LOGIN_URL = "http://localhost:8080/auth/login";
  private SIGNUP_URL = "http://localhost:8080/auth/signup";
  private LOGOUT_URL = "http://localhost:8080/auth/logout";
  private contentHeader = new Headers({"Content-Type": "application/json"});
  jsonHelper = new JwtHelper();

  constructor(public http: Http,public storage:Storage) {
    console.log('Hello AuthProvider Provider');
  }

  login(credentials:any,errorCallback){
    console.log("logging in"); 
    console.log(credentials) 
   this.http.post(this.LOGIN_URL, JSON.stringify(credentials), { headers: this.contentHeader })
      .map(res => res.json())
      .subscribe(
        data => {console.log(data)},
        err => {console.log(err)}
      );
  }

  register(credentials:any){
    console.log("registering");
  }

  authSuccess(token){
      this.storage.set('token', token);
  }
}
