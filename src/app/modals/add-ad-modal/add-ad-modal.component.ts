import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Ad } from 'src/app/models/ad';
import { AdvertisementService } from 'src/app/services/advertisement.service';
import { AmazonService } from 'src/app/services/amazon.service';
import { GoogleMapLocationChooserComponent } from '../google-map-location-chooser/google-map-location-chooser.component';
import { InfoModalComponent } from '../info-modal/info-modal.component';

@Component({
  selector: 'app-add-ad-modal',
  templateUrl: './add-ad-modal.component.html',
  styleUrls: ['./add-ad-modal.component.css']
})
export class AddAdModalComponent implements OnInit {
  public createAdForm: FormGroup;
  public fileChoosen = false;
  private fileToUpload: File = null;
  private location: string = null;
  private latitude: number = null;
  private longitude: number = null;
  public url: string = "";
  private newAd: Ad;

  constructor(private aws: AmazonService, private adService: AdvertisementService, private ActiveModal: NgbActiveModal, private formBuilder: FormBuilder, private modalService: NgbModal) {
    this.createAdForm = this.formBuilder.group({
      inputSize: new FormControl(),
      inputRoom: new FormControl(),
      inputPrice: new FormControl(),
      formFile: new FormControl(),
      inputDetails: new FormControl(),
      selectType: new FormControl(''),
      selectState: new FormControl('')
    });
  }

  public async add() {
    let user_id: number = +localStorage.getItem('user_id'),
      size: number = this.createAdForm.value.inputSize,
      room: number = this.createAdForm.value.inputRoom,
      price = this.createAdForm.value.inputPrice,
      picture = this.aws.uploadFile(this.fileToUpload, user_id, true),
      type: string = this.createAdForm.value.selectType,
      state: string = this.createAdForm.value.selectState,
      details: string = this.createAdForm.value.inputDetails.replace(/ +/g, ' ');

    this.adService.add(user_id, size, room, price, type, state, details, this.location, this.latitude, this.longitude, await picture).subscribe(
      (result: Ad) => {
        this.location = null;
        this.latitude = null;
        this.longitude = null;
        this.ActiveModal.close(result);
        this.openInfoModal("Info", "Ad created successfully");
      },
      (err_response: HttpErrorResponse) => {
        this.openInfoModal("Error", err_response.error.message);
      }
    );
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
      console.log(`AddAdModalComponent has been closed with: ${data}`);
    });
  }

  closeModal(sendData) {
    if (sendData == 'add') {
      this.add();
    } else {
      this.ActiveModal.close(sendData);
    }
  }

  onSelectFile(event) {
    if (event.target.files) {
      this.fileChoosen = true;
      this.fileToUpload = event.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => {
        this.url = e.target.result;
      }
    }
  };

  openLocationChooser() {
    const modalRef = this.modalService.open(GoogleMapLocationChooserComponent, {
      ariaLabelledBy: 'modal-basic-title',
      centered: true,
      scrollable: true,
      size: "lg",
      backdrop: "static",
      keyboard: false
    });

    modalRef.result.then((data) => {
      if (data != 'cancel') {
        console.log(`lat:${data.latitude} lng:${data.longitude}`);
        this.location = data.location;
        this.latitude = data.latitude;
        this.longitude = data.longitude;
      }
    });
  };

  isLocationChosen() { return this.location; }

  ngOnInit(): void {

  }
}
