import { Component, HostBinding, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public navbarCollapsed = true;

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  public navigateToDetails() {
    let id = localStorage.getItem('user_id');
    this.router.navigate([`/details/${id}`]);
  }

}
