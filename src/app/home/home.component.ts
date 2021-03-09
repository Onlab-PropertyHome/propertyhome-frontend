import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

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