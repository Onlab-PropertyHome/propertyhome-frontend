import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../user';
import { UserRegistrationService } from '../user-registration.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  user: User = new User("", "", "", "");
  loginForm: FormGroup;
  validationMessage: string = null;

  constructor(private service: UserRegistrationService, private formBuilder: FormBuilder) { 
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
    // TODO
  }
}
