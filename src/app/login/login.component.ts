import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User, UserLoginDTO } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  user: User = new User("", "", "", "");
  loginForm: FormGroup;
  validationMessage: string = null;

  constructor(private service: AuthService, private formBuilder: FormBuilder, private router: Router) { 
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

  public loginNow(formValues: FormGroup) {
    if (!formValues.valid) {
      console.log('Form is invalid');
      return;
    }

    let userLoginDTO = new UserLoginDTO(
      formValues.value.inputEmail,
      formValues.value.inputPassword
    );

    let response = this.service.login(userLoginDTO);
    response.subscribe(
      res => {
        if (res != "err_wrong_credentials" &&
            res != "err_no_account_with_email") {
              localStorage.setItem('token', res.toString());
        }
        console.log("res: " + res);
        this.router.navigate(['/map']);
      },
      err => {
        console.log("error: " + err);
      }
    )
  }
}
