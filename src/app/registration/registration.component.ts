import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MustMatch } from '../must.match';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthResponse } from '../models/response';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  @ViewChild('errormodal') errormodal;
  message: any;
  registerForm: FormGroup;
  validationMessage: string = null;
  public error_text: string;
  checked : boolean = false;

  constructor(private service: AuthService, private formBuilder: FormBuilder, private router: Router, private modalService: NgbModal) { 
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
      ]),
      Checkbox: new FormControl('', [
        Validators.required
      ])
    }, { validator: MustMatch('inputPassword', 'inputPasswordConf') });
  }

  ngOnInit(): void { }

  public fnc(){
   
   
   if(!this.checked){
     this.checked = true;

   }
   else{this.checked = false;
    this.registerForm.get('Checkbox').reset();}
  }
  public open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', backdrop: "static", keyboard: false}).result
    .then((result) => { }, (reason) => { })
  }

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
        if (err_response.status == 400) {
          this.registerForm.get('inputEmail').reset();
        }
        this.registerForm.get('inputPassword').reset();
        this.registerForm.get('inputPasswordConf').reset();
        this.error_text = err_response.error.message;
        this.open(this.errormodal);
      }
    )
  }
}
