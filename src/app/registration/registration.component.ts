import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MustMatch } from '../must.match';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  user: User = new User("", "", "", "");
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

    this.user = new User(
      formValues.value.inputName, 
      formValues.value.inputEmail, 
      formValues.value.inputPassword, 
      "0620-111-1111"
    );

    let response = this.service.register(this.user);
    response.subscribe(
      res => {
        if (res == "done") {
          formValues.reset({
            inputEmail: '',
            inputName: '',
            inputPassword: '',
            inputPasswordConf: ''
          });
        }
        console.log("res: " + res);
        this.router.navigate(['/login']);
      },
      err => {
        console.log("error: " + err);
      }
    );
  }
}
