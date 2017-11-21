import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController ,LoadingController,ToastController} from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Socket } from 'ng-socket-io';
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
    zoom: 0,
    center: this.currentPos,
    streetViewControl: false,
    mapTypeControl: false,
  }
  private markers:any = [];
  private spinner:any;
  constructor(public navCtrl: NavController,public mapService:MapProvider,
              public toastCtrl: ToastController,public loaderCtrl: LoadingController,
              public geolocation: Geolocation,public socket:Socket) {
                this.socket.connect();
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
      map => {this.map = map,this.mapDidLoad()} ,
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
    this.geolocation.watchPosition().subscribe((position)=>{
      if(typeof position.coords != "undefined"){
        this.currentPos.lat = position.coords.latitude;
        this.currentPos.lng = position.coords.longitude;
        let latLng = new google.maps.LatLng(this.currentPos.lat,this.currentPos.lng);
        let marker = new google.maps.Marker({
          map: this.map,
          position: latLng
        });
        marker.setMap(this.map);
        var circle = new google.maps.Circle({
          map: this.map,
          radius: 16093,    // 10 miles in metres
          fillColor: '#AA0000'
        });
      circle.bindTo('center', marker, 'position');
        this.renderMap();
      }else
        this.showToast("Network running slow!");
    });
  }
  loadMarkers(){
    this.mapService.loadMarkers().subscribe(data => {
      console.log('markers loaded ',data.length)
      this.updateMap(data);
    });
  }
  updateMap(data){
    //clear map of existing markers
    /*for(var i = 0;i<this.markers.length;++i){
      this.markers[i].setMap(null);
    }*/
    this.markers = [];
    //add the newly updated and the new markers
    for(var pt of data){
      let pos = new google.maps.LatLng(pt.lat,pt.lng);
      let marker = new google.maps.Marker({
        map: this.map,
        position:pos
      });
      marker.setMap(this.map);
      this.markers.push(marker);
    }

    
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