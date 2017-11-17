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
    email:"",
    password:"",
    password2:"",

};
  private error:string;
  private authType:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public authService:AuthProvider) {
  this.authType = "login";
}

  goHome(){
    this.navCtrl.push(TabsPage);
  }

  login(){
    if(this.user.username && this.user.password){
      
      this.goHome();
    }else{
      this.error = "error occured";
    }
  }
}
