import { Component, HostBinding, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../models/user';

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
    let id = +localStorage.getItem('user_id');
    this.router.navigate([`/details/${id}`]);
  }

  public getId() {
    return localStorage.getItem('user_id');
  }

  public getName() : string {
    let id = +localStorage.getItem('user_id');
    let user: User;
    this.authService.getById(id)
    .subscribe(
      (response) => {
        user = response;
      },
      (err_response) => {
        console.log(err_response.error.message);
      }
    )
    if (user == null)
      return "";
    return user.name;
  }

}
