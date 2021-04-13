import { AgmCircle } from '@agm/core';
import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import { Ad } from '../models/ad';
import { Marker } from '../models/marker';
import { AdvertisementService } from '../services/advertisement.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})


export class MapComponent implements OnInit {

  public list:Ad[];
  bpLat = 47.49801;
  bpLng = 19.03991;
  zoom = 12;
  public Circles = []

  



  markers = [
  //  new Marker(47.4730961, 19.0600546),
   // new Marker(47.4727899, 19.0598574),
   // new Marker(47.4786881, 19.0586944)
  ];
    
  lat = 51.678418;
  lng = 7.809007;
  r:number = 3000;

  constructor(adService:AdvertisementService) {
    adService.getall().subscribe(
      (ads:Ad[]) => {
        this.list = ads;
        if(this.list.length>0){
        this.list.forEach(Ad => {
          this.markers.push(new Marker(Ad.property.lat,Ad.property.lng))
          this.Circles.push({
            lat:Ad.property.lat,
            lng:Ad.property.lng,
            radius:this.r,
            fillColor:'red'

          })
        });
        }
      }
    );}

    
radiusincrease(){
  this.Circles.forEach(element => {
    element.radius+=50;
    
  });
  
}

radiusdecrease(){
  this.Circles.forEach(element => {
    if(element.radius > 50)
    element.radius-=50;
    
  });
}


delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

async highlight(){
  
  this.Circles.forEach(async element => {
    
    element.fillColor="green";console.log("green");
  }); 
  await this.delay(2000);

  this.Circles.forEach(async element => {
    
    element.fillColor="red";console.log("red");
  });

}

async highlight2(){
  this.Circles.forEach(element => {
    element.fillColor="orange";
  });
  for(let i = 0; i < 20; i++){
    this.Circles.forEach(element => {
      element.radius+=50;
    });
    await this.delay(1);
  }
  for(let i = 0; i < 20; i++){
    this.Circles.forEach(element => {
      element.radius-=50;
    });
    await this.delay(1);
  }
  this.Circles.forEach(element => {
    element.fillColor="blue";
  });
  await this.delay(200)
  this.Circles.forEach(element => {
    element.fillColor="red";
  });
}
   

  ngOnInit(): void { }

}
