import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../auth.service';
import { AuthResponse } from '../models/response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('errormodal') errormodal;
  loginForm: FormGroup;
  public error_text = "";

  constructor(private service: AuthService, private formBuilder: FormBuilder, private router: Router, private modalService: NgbModal) {     
    this.loginForm = this.formBuilder.group({
      inputEmail: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      inputPassword: new FormControl('', [
        Validators.required
      ])
    });
  }

  ngOnInit(): void {
  }

  public open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', backdrop: "static", keyboard: false}).result
    .then((result) => { }, (reason) => { })
  }

  public loginNow(formValues: FormGroup) {
    if (!formValues.valid) {
      console.log('Form is invalid');
      return;
    }

    let response = this.service.login(formValues.value.inputEmail, formValues.value.inputPassword);
    response.subscribe(
      (response: AuthResponse) => {
        console.log(response.jwt);
        localStorage.setItem('token', response.jwt);
        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(response.jwt);
        localStorage.setItem('user_id', decodedToken.jti);
        this.router.navigate(['/home']);
      },
      (err_response: HttpErrorResponse) => {
        if (err_response.status == 401) {
          this.loginForm.get('inputPassword').reset();
        }

        if (err_response.status == 404) {
          this.loginForm.reset();
        }
        this.error_text = err_response.error.message;
        this.open(this.errormodal);
      }
    )
  }
}
