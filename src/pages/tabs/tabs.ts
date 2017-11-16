import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { SettingsPage } from '../settings/settings';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  
  profileTab = HomePage;
  mapTab = AboutPage;
  settingsTab = SettingsPage;

  constructor() {
    let api_key = "AIzaSyCcqMsU_4tVuiqG5Y-Gpprn3n-7PWwmtv0";
  }
}
