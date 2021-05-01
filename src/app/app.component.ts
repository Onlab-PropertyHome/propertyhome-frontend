import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InfoModalComponent } from './components/modals/info-modal/info-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'propertyhome-frontend';

  constructor(private jwtHelper: JwtHelperService, private modalService: NgbModal, private router: Router) { }

  ngOnInit(): void {
    let token = localStorage.getItem('token');
    if (token) {
      if (this.jwtHelper.isTokenExpired(token)) {
        this.openInfoModal("Error", "The token has been expired");
      }
    }
  }

  private openInfoModal(title: string, text: string) {
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
      localStorage.removeItem('user_id');
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    });
  }
}
