import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
/*
  Generated class for the MapProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
declare var google;

@Injectable()
export class MapProvider {
  private  locations = [
      ['Bondi Beach', -33.890542, 151.274856, 4],
      ['Coogee Beach', -33.923036, 151.259052, 5],
      ['Cronulla Beach', -34.028249, 151.157507, 3],
      ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
      ['Maroubra Beach', -33.950198, 151.259302, 1]
    ];
  constructor(public http: HttpClient) {
    console.log('Hello MapProvider Provider');
  }
  initMap(element,options,mapCallback,errorCallback){
    if(typeof google != "undefined"){
        mapCallback(new google.maps.Map(element, options));
    }else{
       errorCallback("Check your internet!")
    }
  }
  loadMarkers(map):Observable<any>{
    
    
    return new Observable(observer=>{
      setInterval(()=>{
        observer.next(this.getMarkers(map));
      },1000)
    });
  }
  getMarkers(map){
    
    var markers = [];
    for(let item of this.locations){
      let rand = Math.ceil(Math.random()*10);
      let position = new google.maps.LatLng(rand,rand);
      let marker = new google.maps.Marker({position:position,title:item[0]});
      marker.setMap(map);
      markers.push(marker);
    }
    return markers;
  }
}
