import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MapProvider} from '../../providers/map/map';
declare var google;

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  private currentPos={
    lat: 41.85, 
    lng: -87.65
  };
  private mapOptions = {
    zoom: 7,
    center: this.currentPos
  }
  private markers:any = [];
  constructor(public navCtrl: NavController,private mapService:MapProvider) {

  }

  ionViewDidLoad(){
    this.initMap();
  }
  
  initMap() {
    console.log("loading map");
    this.mapService.initMap(this.mapElement.nativeElement,this.mapOptions,
      (map) => {this.map = map,this.loadMarkers()} ,
      error => console.log(error)
    );
    this.directionsDisplay.setMap(this.map);
  }

  loadMarkers(){
    this.mapService.loadMarkers(this.map).subscribe(data => {
      this.updateMap(data);
    });
  }
  updateMap(data){
    //clear map of existing markers
    for(var i = 0;i<this.markers.length;++i){
      this.markers[i].setMap(null);
    }
    this.markers = [];
    //add the newly updated and the new markers
    this.markers = data;
    this.renderMap();
  }
  renderMap(){
    this.directionsDisplay.setMap(this.map);
  }
  calculateAndDisplayRoute() {
    this.directionsService.route({
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

}