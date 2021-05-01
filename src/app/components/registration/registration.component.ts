import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MustMatch } from '../../must.match';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthResponse } from '../../models/response';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InfoModalComponent } from '../modals/info-modal/info-modal.component';



@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  message: any;
  registerForm: FormGroup;
  validationMessage: string = null;
  checked: boolean = false;

  constructor(
    private service: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private modalService: NgbModal
  ) {
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

  public fnc() {
    if (!this.checked) {
      this.checked = true;

    }
    else {
      this.checked = false;
      this.registerForm.get('Checkbox').reset();
    }
  }

  public openInfoModal(title: string, text: string) {
    const modalRef = this.modalService.open(InfoModalComponent, {
      ariaLabelledBy: 'modal-basic-title',
      centered: true,
      scrollable: true,
      backdrop: "static",
      keyboard: false
    });

    modalRef.componentInstance.modal_title = title;
    modalRef.componentInstance.modal_text = text;

    modalRef.result.then((data) => {
      console.log(`InfoModalComponent has been closed with: ${data}`);
    });
  }

  public registerNow(formValues: FormGroup) {
    if (!formValues.valid) {
      console.log('Form is invalid');
      return;
    }

    console.log(formValues.value.inputName);
    this.service.register(
      formValues.value.inputName, formValues.value.inputEmail, formValues.value.inputPassword, null
    ).subscribe(
      (response: AuthResponse) => {
        console.log(response.jwt);
        localStorage.setItem('token', response.jwt);
        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(response.jwt);
        localStorage.setItem('user_id', decodedToken.jti);
        this.openInfoModal('Info', 'Successfully registration');
        this.router.navigate(['/home']);
      },
      (err_response: HttpErrorResponse) => {
        if (err_response.status == 400) {
          this.registerForm.get('inputEmail').reset();
        }
        this.registerForm.get('inputPassword').reset();
        this.registerForm.get('inputPasswordConf').reset();
        this.openInfoModal('Error', err_response.error.message);
      }
    )
  }
}
