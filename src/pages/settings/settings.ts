import { Component , ViewChild} from '@angular/core';
import { NavController } from 'ionic-angular';
import { List } from 'ionic-angular';
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

@ViewChild(List) list: List;
  constructor(public navCtrl: NavController) {

  }

}
