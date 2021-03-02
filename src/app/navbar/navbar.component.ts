import { Component, HostBinding, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public navbarCollapsed = true;

  constructor() { }

  ngOnInit(): void {
  }

}
