import { Component, HostBinding, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public navbarCollapsed = true;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

}
