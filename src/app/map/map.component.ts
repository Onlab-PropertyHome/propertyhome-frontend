import { Component, OnInit } from '@angular/core';
import { Marker } from '../models/marker';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

  bpLat = 47.49801;
  bpLng = 19.03991;
  zoom = 12;

  markers = [
    new Marker(47.4730961, 19.0600546),
    new Marker(47.4727899, 19.0598574),
    new Marker(47.4786881, 19.0586944)
  ];
    
  lat = 51.678418;
  lng = 7.809007;

  constructor() { }

  ngOnInit(): void { }

}
