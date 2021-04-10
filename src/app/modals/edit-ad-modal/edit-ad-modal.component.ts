import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Ad } from 'src/app/models/ad';
import { AdvertisementService } from 'src/app/services/advertisement.service';
import { AmazonService } from 'src/app/services/amazon.service';
import { AuthService } from 'src/app/services/auth.service';
import { GoogleMapLocationChooserComponent } from '../google-map-location-chooser/google-map-location-chooser.component';
import { InfoModalComponent } from '../info-modal/info-modal.component';

@Component({
  selector: 'app-edit-ad-modal',
  templateUrl: './edit-ad-modal.component.html',
  styleUrls: ['./edit-ad-modal.component.css']
})
export class EditAdModalComponent implements OnInit {
  public temp:Ad=null;
  public editAdForm: FormGroup;
  public fileChoosen: boolean = false;
  private fileToUpload: File = null;
  private location: string = null;
  private latitude: number = null;
  private longitude: number = null;

  public ads: Ad[] = [];
  public url: string = "";

  constructor(private ActiveModal:NgbActiveModal, private service: AuthService, private adService: AdvertisementService, private modalService: NgbModal, private formBuilder: FormBuilder,private aws: AmazonService) { 
    this.editAdForm = this.formBuilder.group({
      inputSize: new FormControl(),
      inputRoom: new FormControl(),
      inputPrice: new FormControl(),
      formFile: new FormControl(),
      inputDetails: new FormControl(),
      selectType: new FormControl(''),
      selectState: new FormControl('')
    });
  }

  ngOnInit(): void {
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

  public edit(ad: Ad) {
    let ad_id: number = ad.ad_id,
    size: number = (this.editAdForm.value.inputSize == "" || !this.editAdForm.value.inputSize) ? ad.property.size : this.editAdForm.value.inputSize,
    picture: string = ad.picture,
    room: number = (this.editAdForm.value.inputRoom == "" || !this.editAdForm.value.inputRoom) ? ad.property.roomNumber : this.editAdForm.value.inputRoom,
    price: string = (this.editAdForm.value.inputPrice == "" || !this.editAdForm.value.inputPrice) ? ad.price : this.editAdForm.value.inputPrice,
    type: string = (this.editAdForm.value.selectType == "" || !this.editAdForm.value.selectType) ? ad.property.type : this.editAdForm.value.selectType,
    state: string = (this.editAdForm.value.selectState == "" || !this.editAdForm.value.selectState) ? ad.property.state : this.editAdForm.value.selectState,
    location: string = (!this.location) ? ad.location : this.location,
    latitude: number = (!this.latitude) ? ad.property.lat : this.latitude,
    longitude: number = (!this.longitude) ? ad.property.lng : this.longitude,
    details: string = (this.editAdForm.value.inputDetails == "" || !this.editAdForm.value.inputDetails) ? ad.details : this.editAdForm.value.inputDetails.replace(/ +/g, ' ');

    this.adService.edit(ad_id, size, room, price, type, state, details, location, latitude, longitude, picture).subscribe(
      (result: Ad) => {
        
        this.location = null;
        this.latitude = null;
        this.longitude = null;
      },
      (err_response: HttpErrorResponse) => {
        this.openInfoModal('Error', err_response.error.message);
      }
    )
  }

  public onSelectFile(event) {
    if (event.target.files) {
      this.fileChoosen = true;
      this.fileToUpload = event.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => {
        this.url = e.target.result;
      }
    }
  }

  closeModal(sendData) {
    if (sendData == 'add') {
      this.edit(this.temp);
    } else {
      this.ActiveModal.close(sendData);
    }
  }

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
  }

  public isLocationChoosen() {
    return this.location;
  }

}
