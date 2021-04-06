import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdvertisementService } from '../services/advertisement.service';
import { AmazonService } from '../services/amazon.service';
import { AuthService } from '../services/auth.service';
import { GoogleMapLocationChooserComponent } from '../modals/google-map-location-chooser/google-map-location-chooser.component';
import { DeleteModalComponent } from '../modals/delete-modal/delete-modal.component';
import { Ad } from '../models/ad';
import { User } from '../models/user';
import { InfoModalComponent } from '../modals/info-modal/info-modal.component';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css']
})
export class AdsComponent implements OnInit {
  public ads: Ad[] = [];
  public url: string = "";
  private closeResult: string = '';
  public createAdForm: FormGroup;
  public editAdForm: FormGroup;
  public fileChoosen: boolean = false;
  private fileToUpload: File = null;
  private location: string = null;
  private latitude: number = null;
  private longitude: number = null;
  public temp?:Ad;

  constructor(private service: AuthService, private adService: AdvertisementService, private modalService: NgbModal, private formBuilder: FormBuilder,private aws: AmazonService) {
    this.createAdForm = this.formBuilder.group({
      inputSize: new FormControl(),
      inputRoom: new FormControl(),
      inputPrice: new FormControl(),
      formFile: new FormControl(),
      inputDetails: new FormControl(),
      selectType: new FormControl(''),
      selectState: new FormControl('')
    });

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

  public removeenter(event){
    let x = event.which||event.keyCode;
    if(x == '13')
      event.preventDefault();
  }
  public open(content, ad?: Ad) {
    if(ad != null)
      this.temp = ad;
    
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true, scrollable: true, size: "lg", backdrop: "static", keyboard: false }).result
    .then((result) => {
      if (result == 'add') {
        this.fileChoosen = false;
        this.add();
        this.createAdForm.reset();
      }

      if (result == 'edit') {
        this.fileChoosen = false;
        this.edit(this.temp);
        this.createAdForm.reset();
      }

      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.location = null;
      this.latitude = null;
      this.longitude = null;

      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    })
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else if (reason == 'Cross click') {
      this.fileChoosen = false;
      this.createAdForm.reset();
      return `with: ${reason}`;
    } else {
      return `with: ${reason}`;
    }
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

  ngOnInit(): void {
    this.refreshAds();
  }

  private refreshAds() {
    let id: number = +localStorage.getItem('user_id');
    this.service.getById(id)
    .subscribe(
      (user: User) => {
        this.ads = user.ads;
      },
      (err_response: HttpErrorResponse) => {
        this.openInfoModal('Error', err_response.error.message);
      }
    )
  }

  public isLocationChoosen() {
    return this.location;
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
        this.refreshAds();
        this.location = null;
        this.latitude = null;
        this.longitude = null;
      },
      (err_response: HttpErrorResponse) => {
        this.openInfoModal('Error', err_response.error.message);
      }
    );
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
        this.refreshAds();
        this.location = null;
        this.latitude = null;
        this.longitude = null;
      },
      (err_response: HttpErrorResponse) => {
        this.openInfoModal('Error', err_response.error.message);
      }
    )
  }

  public openDeleteModal(ad: Ad) {
    let ad_id = ad.ad_id;

    const modalRef = this.modalService.open(DeleteModalComponent, {
      ariaLabelledBy: 'modal-basic-title',
      centered: true,
      scrollable: true,
      size: "lg",
      backdrop: "static",
      keyboard: false 
    });

    modalRef.componentInstance.bound = 'advertisement';
    modalRef.componentInstance.param = ad_id;

    modalRef.result.then((data) => {
      console.log(`DeleteModalComponent has been closed with: ${data}`);
      if (data == 'yes') {
        this.ads = this.ads.filter(ad => ad.ad_id !== ad_id);        
      }
    });
  }

  mapClicked($event: any) {
    console.log(`lat:${$event.coords.lat} lng:${$event.coords.lng}`)
  }

  public translateString(str: string) : string {
    let temp = str.replace('_', ' ');
    let firstLetter = temp.substring(0, 1);
    return firstLetter.toUpperCase() + temp.substring(1);
  }

  public translateDetails(str: string) : string {
    if (str.length > 42) {
      let first = str.substring(0, 42);
      if (first[41] == ' ')
        return first + "...";
      else
        return first + " ...";
    }

    return str;
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

}
