import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';

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
  private username:string;
  private password:string;
  private error:string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  
}

  goHome(){
    this.navCtrl.push(TabsPage);
  }

  login(){
    if(this.username && this.password){
      this.goHome();
    }else{
      this.error = "error occured";
    }
  }
}
