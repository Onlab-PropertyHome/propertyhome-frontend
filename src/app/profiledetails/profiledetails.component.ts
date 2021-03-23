import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AmazonService } from '../amazon.service';
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
  public detailsForm: FormGroup;
  public selectedPicture: File;
  
  constructor(
    private route: ActivatedRoute,
    private service: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private aws: AmazonService
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
      ]),
      userPic: new FormControl()
    })
  }

  public onSelectFile(event) {
    if (event.target.files) {
      this.selectedPicture = event.target.files[0];
    }
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

  public async save(formValues: FormGroup) {
    if (!formValues.valid) {
      console.log('Form is invalid');
      return;
    }

    let user_id: number = +localStorage.getItem('user_id'),
        name = this.detailsForm.value.userFullName,
        email = this.detailsForm.value.userEmail,
        password = this.detailsForm.value.userPassword,
        tel = this.detailsForm.value.userTel,
        picture;

    if (this.selectedPicture != null) {
      picture = this.aws.uploadFile(this.selectedPicture, user_id, false);
    } else {
      picture = "";
    }

    if (name == "" && email == "" && password == "" && tel == "" && this.selectedPicture == null) {
      alert("There are no changes!");
    } else {
      this.service.save(user_id, name, email, password, tel, await picture)
      .subscribe(
        (response) => {
          this.setIsEditing();
          this.detailsForm.reset();

          alert("User successfully updated!");
          this.selectedPicture = null;

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
        this.user = response;
        if (this.user.picture == null) {
          this.user.picture = "assets/default-user.jpg";
        }
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
