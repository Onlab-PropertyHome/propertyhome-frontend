import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserDTO } from '../models/user';

@Component({
  selector: 'app-profiledetails',
  templateUrl: './profiledetails.component.html',
  styleUrls: ['./profiledetails.component.css']
})
export class ProfiledetailsComponent implements OnInit {
  userDTO;
  
  constructor(
    private route: ActivatedRoute,
    private service: AuthService
  ) { }

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile() {
    const userId = +this.route.snapshot.paramMap.get('id');
    this.service.getById(userId).subscribe(
      data => this.userDTO = data,
      err => console.log(err)
    );
  }

}
