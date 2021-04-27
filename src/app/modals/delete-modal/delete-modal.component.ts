import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdvertisementService } from 'src/app/services/advertisement.service';
import { AmazonService } from 'src/app/services/amazon.service';
import { AuthService } from 'src/app/services/auth.service';
import { InfoModalComponent } from '../info-modal/info-modal.component';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent implements OnInit {
  public bound: string = null;
  public param: any = null;

  constructor(
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    private authService: AuthService,
    private adService: AdvertisementService,
    private amazonService: AmazonService
  ) { }

  ngOnInit(): void {
  }

  openInfoModal(title: string, text: string) {
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

  delete() {
    switch (this.bound) {
      case 'profile':
        this.authService.delete(+this.param).subscribe(
          (response) => {
            this.openInfoModal('Info', 'User profile has been deleted successfully');
            this.amazonService.deleteEveryImage(+this.param);
            this.closeModal('yes');
          },
          (err_response) => {
            this.openInfoModal('Error', `${err_response.error.message}`);
            this.closeModal('error');
          }
        );
        break;
      case 'advertisement':
        this.adService.delete(+this.param).subscribe(
          (response) => {
            this.openInfoModal('Info', 'Advertisement has been deleted successfully');
            this.closeModal('yes');
          },
          (err_response) => {
            this.openInfoModal('Error', `${err_response.error.message}`);
            this.closeModal('error');
          }
        );
        break;
    }
  }

  closeModal(sendData) {
    this.activeModal.close(sendData);
  }
}
