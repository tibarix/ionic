import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { SuperTabsModule } from 'ionic2-super-tabs';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { SettingsPage } from '../pages/settings/settings';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { SplashPage } from '../pages/splash/splash';
import { Geolocation } from '@ionic-native/geolocation';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '@angular/common/http';
import { AuthProvider } from '../providers/auth/auth';
import {
 GoogleMaps
} from '@ionic-native/google-maps';
@NgModule({
  declarations: [
    MyApp,
    SplashPage,
    AboutPage,
    SettingsPage,
    HomePage,
    TabsPage,
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    SuperTabsModule.forRoot(),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    SplashPage,
    MyApp,
    
    AboutPage,
    SettingsPage,
    HomePage,
    TabsPage,
   
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
     GoogleMaps,
     HttpClientModule,
     AuthProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
