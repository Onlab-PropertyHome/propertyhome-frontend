import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdvertisementService } from '../../services/advertisement.service';
import { AmazonService } from '../../services/amazon.service';
import { AuthService } from '../../services/auth.service';
import { GoogleMapLocationChooserComponent } from '../modals/google-map-location-chooser/google-map-location-chooser.component';
import { DeleteModalComponent } from '../modals/delete-modal/delete-modal.component';
import { Ad } from '../../models/ad';
import { User } from '../../models/user';
import { InfoModalComponent } from '../modals/info-modal/info-modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { AddAdModalComponent } from '../modals/add-ad-modal/add-ad-modal.component';
import { EditAdModalComponent } from '../modals/edit-ad-modal/edit-ad-modal.component';


@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css']
})
export class AdsComponent implements OnInit {
  public ads: Ad[] = [];
  public url: string = "";
  public createAdForm: FormGroup;
  public editAdForm: FormGroup;
  public fileChoosen: boolean = false;
  private location: string = null;
  private latitude: number = null;
  private longitude: number = null;
  public temp?:Ad;
  public isMobile = false;
  public windowWidth: number;

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

    this.windowWidth = window.innerWidth;
    this.isMobile = this.windowWidth < 992;
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

  public openAddAdModal() {
    const modalRef = this.modalService.open(AddAdModalComponent, {
      ariaLabelledBy: 'modal-basic-title',
      centered: true,
      scrollable: true,
      backdrop: "static",
      keyboard: false 
    });

  

    modalRef.result.then((data) => {
      if(data) {
        this.refreshAds();
      }
      console.log(`AddAdModalComponent has been closed with: ${data}`);
    });
  }

  public openEditAdModal(ad:Ad) {
    const modalRef = this.modalService.open(EditAdModalComponent, {
      ariaLabelledBy: 'modal-basic-title',
      centered: true,
      scrollable: true,
      backdrop: "static",
      keyboard: false 
    });

    modalRef.componentInstance.temp = ad;
  

    modalRef.result.then((data) => {
      if(data) {
        this.refreshAds();
      }
      console.log(`EditAdModalComponent has been closed with: ${data}`);
    });
  }

  public removeenter(event){
    let x = event.which||event.keyCode;
    if(x == '13')
      event.preventDefault();
  }

  public onSelectFile(event) {
    if (event.target.files) {
      this.fileChoosen = true;
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => {
        this.url = e.target.result;
      }
    }
  }

  @HostListener('window:resize', ['$event']) onResize(event) {
    this.windowWidth = event.target.innerWidth;
    if (this.windowWidth < 992)
      this.isMobile = true;
    else
      this.isMobile = false;
  }

  public shortenLocation(location: string, type: string) {
    let max: number;

    switch (type) {
      case 'small': max = 29; break;
      case 'extra-small': max = 14; break;
    }

    let str = location.substring(0, max);

    if (str.charAt(max) == ' ')
      return str + '...';

    return str.substring(0, max - 1) + ' ...';
  }

  ngOnInit(): void {
    this.refreshAds();
  }

  private refreshAds() {
    let id: number = +localStorage.getItem('user_id');
    this.service.getById(id)
    .toPromise().then(
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
