import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth.service';
import { InfoModalComponent } from '../modals/info-modal/info-modal.component';
import { AuthResponse } from '../../models/response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private service: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private modalService: NgbModal
    ) {     
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

  public loginNow(formValues: FormGroup) {
    if (!formValues.valid) {
      console.log('Form is invalid');
      return;
    }

    this.service.login(
      formValues.value.inputEmail,
      formValues.value.inputPassword
      ).toPromise().then(
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

        this.openInfoModal('Error', err_response.error.message);
      }
    );
  }
}
