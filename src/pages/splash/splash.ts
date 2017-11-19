import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AuthProvider } from '../../providers/auth/auth';
/**
 * Generated class for the SplashPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html',
})
export class SplashPage {
  private user:any = {
    username : "",
    name:"med", // mock
    job:"hello", // mock
    email:"",
    password:"",
    password2:"",

};
  private error:string;
  private authType:string = "login";
  constructor(public navCtrl: NavController, public navParams: NavParams, public authService:AuthProvider) {
}

  goHome(){
    this.navCtrl.push(TabsPage);
  }

  login(){
    this.authService.login(this.user,
    (data) => {
      if(data){
        console.log(data);
        this.goHome();
      }
    },
    (err)=> {
      console.log(err);
      this.error = err;
    });
  }
  signup(){
    console.log("signup")
  }

  clearForms(){
    this.user = {};
  }
}
