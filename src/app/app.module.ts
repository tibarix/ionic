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
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import {IonicStorageModule} from '@ionic/storage';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { AuthProvider } from '../providers/auth/auth';
import {
 GoogleMaps
} from '@ionic-native/google-maps';
import { MapProvider } from '../providers/map/map';
const config: SocketIoConfig = { url: 'http://localhost:3001', options: {} };
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
    IonicStorageModule.forRoot(),
    SocketIoModule.forRoot(config),
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
     AuthProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MapProvider,
  ]
})
export class AppModule {}
