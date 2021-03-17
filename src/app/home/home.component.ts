import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Ad } from '../models/ad';
import { Property } from '../models/property';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private example_property: Property = {property_id: 1,ad:null,roomNumber: 5,type:"jo",state:"omladozik a haz",size:1234 }

  private example_ad: Ad = { ad_id: 1, property: this.example_property, picture: "https://www.propertysupport.hu/wp-content/uploads/2020/11/property-support-ingatlan-tanacsadas-1.jpg", price: "1500000 Ft", location: "Budapest ...", details: null };

public ads: Ad[] = [this.example_ad]

  constructor(private service: AuthService) { }

  ngOnInit(): void {
  }

  tomb = [
    "assets/logo-black.png",
    "assets/logo-with-text.png",
    "assets/404-not-found.png"
  ];

  getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  rnd() {
    let a = this.getRndInteger(0, 2);
    return this.tomb[a];
  }

  public styleobject: Object = {
    'background-image': 'url(' + this.rnd() + ')',
  }
}