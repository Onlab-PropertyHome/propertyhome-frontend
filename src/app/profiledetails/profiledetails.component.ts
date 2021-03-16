import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User, UserDTO } from '../models/user';

@Component({
  selector: 'app-profiledetails',
  templateUrl: './profiledetails.component.html',
  styleUrls: ['./profiledetails.component.css']
})
export class ProfiledetailsComponent implements OnInit {
  public user: User;
  
  constructor(
    private route: ActivatedRoute,
    private service: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile() {
    const userId = +this.route.snapshot.paramMap.get('id');
    this.service.getById(userId).subscribe(
      (response: User) => { 
        this.user = response 
      },
      (error: HttpErrorResponse) => {
        console.log(error.message)
        this.router.navigate(['/not-found']);
      }
    );
  }

}
