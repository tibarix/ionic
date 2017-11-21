import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Socket } from 'ng-socket-io';
/*
  Generated class for the MapProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
declare var google;

@Injectable()
export class MapProvider {
  constructor(public http: HttpClient,public socket:Socket) {
    console.log('Hello MapProvider Provider');
  }
  initMap(element,options,mapCallback,errorCallback){
    
    if(typeof google != "undefined"){
        mapCallback(new google.maps.Map(element, options));
    }else{
       errorCallback()
    }
  }
  loadMarkers():Observable<any>{
    console.log("calling load markers");
    this.socket.emit("markers");
    let observable = new Observable(observer=>{
      this.socket.on("markersx",(data)=>{
        console.log("incoming data",data," at "+new Date());
          observer.next(data);
      });
    });
    return observable;
  }
}
