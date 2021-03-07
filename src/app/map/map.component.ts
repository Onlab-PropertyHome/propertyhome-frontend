import { Component, NgModule, OnInit } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
     
 




export class MapComponent implements OnInit {

  
  constructor() { 



  }
  title = 'My first AGM project';
  lat = 51.678418;
  lng = 7.809007;
  zoom = 12;
  ngOnInit(): void {
  }

}
