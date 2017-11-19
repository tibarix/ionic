import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController ,LoadingController,ToastController} from 'ionic-angular';
import { MapProvider} from '../../providers/map/map';
declare var google;

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  private directionsService ;
  private directionsDisplay ;
  private currentPos={
    lat: 41.85, 
    lng: -87.65
  };
  private mapOptions = {
    zoom: 7,
    center: this.currentPos
  }
  private markers:any = [];
  private spinner:any;
  constructor(public navCtrl: NavController,public mapService:MapProvider,
              public toastCtrl: ToastController,public loaderCtrl: LoadingController) {
    if(typeof google != "undefined"){
      this.directionsService = new google.maps.DirectionsService;
      this.directionsDisplay = new google.maps.DirectionsRenderer;
    }else{
      this.showToast("Check your internet");
    }
  }

  ionViewDidLoad(){
    if(typeof google != "undefined"){
      this.initMap();
    }
  }
  
  initMap() {
    this.showLoader("Loading map");
    this.mapService.initMap(this.mapElement.nativeElement,this.mapOptions,
      (map) => {this.map = map,this.loadMarkers();this.spinner.dismiss()} ,
      error => {this.spinner.dismiss();console.log(error)}
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

  showToast(message?,duration?,position?){
    message = message || "Error occured,please try again later!";
    duration = duration || 1000;
    position = position || 'bottom';
    this.toastCtrl.create({
        message: message,
        duration: duration,
        position: position,

      }).present();
  }
  showLoader(message,callback?,duration?){
    duration = duration || 2000;
    this.spinner = this.loaderCtrl.create({
        spinner: 'show',
        content:message,
        duration: duration
      });
      this.spinner.present();
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