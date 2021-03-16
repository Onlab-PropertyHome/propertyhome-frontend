import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MustMatch } from '../must.match';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthResponse } from '../models/response';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  message: any;
  registerForm: FormGroup;
  validationMessage: string = null;

  constructor(private service: AuthService, private formBuilder: FormBuilder, private router: Router) { 
    this.registerForm = this.formBuilder.group({
      inputEmail: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      inputName: new FormControl('', [
        Validators.required
      ]),
      inputPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20)
      ]),
      inputPasswordConf: new FormControl('', [
        Validators.required
      ])
    }, { validator: MustMatch('inputPassword', 'inputPasswordConf') });
  }

  ngOnInit(): void { }

  public registerNow(formValues: FormGroup) {
    if (!formValues.valid) {
      console.log('Form is invalid');
      return;
    }

    console.log(formValues.value.inputName);
    this.service.register(formValues.value.inputName, formValues.value.inputEmail, formValues.value.inputPassword, null)
    .subscribe(
      (response: AuthResponse) => {
        console.log(response.jwt);
        localStorage.setItem('token', response.jwt);
        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(response.jwt);
        localStorage.setItem('user_id', decodedToken.jti);
        this.router.navigate(['/home']);
      },
      (err_response: HttpErrorResponse) => {
        alert(err_response.error.message);
      }
    )
  }
}
