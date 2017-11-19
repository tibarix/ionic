import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController ,LoadingController,ToastController} from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
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
    center: this.currentPos,
    streetViewControl: false,
    mapTypeControl: false,
  }
  private markers:any = [];
  private spinner:any;
  private myMarker:any;
  constructor(public navCtrl: NavController,public mapService:MapProvider,
              public toastCtrl: ToastController,public loaderCtrl: LoadingController,
              public geolocation: Geolocation) {
    if(typeof google != "undefined"){
      this.directionsService = new google.maps.DirectionsService;
      this.directionsDisplay = new google.maps.DirectionsRenderer;
      this.geolocation.getCurrentPosition().then((pos)=>{
        this.currentPos.lat = pos.coords.latitude;
        this.currentPos.lng = pos.coords.longitude;
        this.initMap();
      }).catch((err)=>{
        console.log(err)
      });

      
    }else{
      this.showToast("Check your internet");
    }
  }

  ionViewDidLoad(){
    
  }
  
  initMap() {
    this.showLoader("Loading map");
    this.mapService.initMap(this.mapElement.nativeElement,this.mapOptions,
      (map) => {this.map = map,this.mapDidLoad()} ,
      error => {this.spinner.dismiss();console.log(error)}
    );
    this.directionsDisplay.setMap(this.map);
  }
  mapDidLoad(){
    this.loadMarkers();
    this.spinner.dismiss();
    this.watchPosition();
  }
  watchPosition(){
    console.log("fkjzhfrj")
    this.geolocation.watchPosition().subscribe((position)=>{
      let x = position.coords.latitude;
      let y = position.coords.longitude;
      let latLng = new google.maps.LatLng(x,y);
      let marker = new google.maps.Marker({
        map: this.map,
        
        position: latLng
      });
      marker.setMap(this.map);
      this.updateMap([marker]);
    });
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