import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../models/user';

@Component({
  selector: 'app-profiledetails',
  templateUrl: './profiledetails.component.html',
  styleUrls: ['./profiledetails.component.css']
})
export class ProfiledetailsComponent implements OnInit {
  public user: User;
  private isEditing: boolean = false;
  public detailsForm: FormGroup
  
  constructor(
    private route: ActivatedRoute,
    private service: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.detailsForm = this.formBuilder.group({
      userFullName: new FormControl('', []),
      userEmail: new FormControl('', [
        Validators.email
      ]),
      userPassword: new FormControl('', [
        Validators.minLength(8),
        Validators.maxLength(20)
      ]),
      userTel: new FormControl('', [
        Validators.minLength(11),
        Validators.maxLength(11)
      ])
    })
  }

  public delete() {
    this.service.delete(+localStorage.getItem('user_id'))
    .subscribe(
      (response) => {
        alert("User deleted successfully");
      },
      (err_response) => {
        alert(err_response.error.message);
      }
    )

    this.service.logoutUser();
    this.router.navigate(['/login']);
  }

  public save(formValues: FormGroup) {
    if (!formValues.valid) {
      console.log('Form is invalid');
      return;
    }

    let name = this.detailsForm.value.userFullName;
    let email = this.detailsForm.value.userEmail;
    let password = this.detailsForm.value.userPassword;
    let tel = this.detailsForm.value.userTel;

    if (name == "" && email == "" && password == "" && tel == "") {
      alert("There are no changes!");
    } else {
      let id = +localStorage.getItem('user_id');
      this.service.save(id, name, email, password, tel)
      .subscribe(
        (response) => {
          this.setIsEditing();
          this.detailsForm.reset();

          alert("User successfully updated!");

          window.location.reload();
        },
        (err_response) => {
          alert(err_response.error.message);
        }
      )
    }
  }

  public cancel() {
    this.setIsEditing();
    this.detailsForm.reset();
  }

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

  public setIsEditing() : void {
    this.isEditing = !this.isEditing;
  }

  public getIsEditing() : boolean {
    return this.isEditing;
  }

}
