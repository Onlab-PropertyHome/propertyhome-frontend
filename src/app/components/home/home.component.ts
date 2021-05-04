import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdvertisementService } from '../../services/advertisement.service';
import { AuthService } from '../../services/auth.service';
import { AdDetailsComponent } from '../modals/ad-details/ad-details.component';
import { InfoModalComponent } from '../modals/info-modal/info-modal.component';
import { Ad } from '../../models/ad';
import { User, UserDetails } from '../../models/user';
import { AdSearch } from 'src/app/models/adsearch';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public ads: Ad[] = [];
  public searchForm: FormGroup;
  private user: User = null;

  constructor(private service: AdvertisementService, private authService: AuthService, private formBuilder: FormBuilder, private modalService: NgbModal) {
    if (localStorage.getItem('search')) {
      let search = <AdSearch>JSON.parse(localStorage.getItem('search'));
      this.searchForm = formBuilder.group({
        inputSize: new FormControl(search.size != null ? search.size : '', []),
        inputRooms: new FormControl(search.roomNumber != null ? search.roomNumber : '', []),
        selectType: new FormControl(search.type, []),
        selectPriceRange: new FormControl(search.price, []),
        inputLocation: new FormControl(search.location, []),
        cbSaveSearch: new FormControl(false, [])
      });
      localStorage.removeItem('search');
    } else {
      this.searchForm = formBuilder.group({
        inputSize: new FormControl('', []),
        inputRooms: new FormControl('', []),
        selectType: new FormControl('', []),
        selectPriceRange: new FormControl('All', []),
        inputLocation: new FormControl('', []),
        cbSaveSearch: new FormControl(false, [])
      });
    }
  }

  ngOnInit(): void {
    if (localStorage.getItem('user_id')) {
      const user_id: number = +localStorage.getItem('user_id');
      this.authService.getById(user_id).subscribe(
        (response: User) => { 
          this.user = response;
        }
      );
    }
    
    this.search();
  }

  public formatPrice(price) {
    return Intl.NumberFormat('en-US', { style: 'decimal' }).format(price);
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

  public search() {
    let size: number, rooms: number, type: string, priceRange: string, location: string;
    let formValueOf = this.searchForm.value;

    if (formValueOf.inputSize == '') {
      size = null;
    } else {
      size = parseInt(formValueOf.inputSize);
    }

    if (formValueOf.inputRooms == '') {
      rooms = null;
    } else {
      rooms = parseInt(formValueOf.inputRooms);
    }

    if (formValueOf.selectType == '') {
      type = null;
    } else {
      type = formValueOf.selectType;
    }

    if (formValueOf.inputLocation == '') {
      location = null;
    } else {
      location = formValueOf.inputLocation;
    }

    priceRange = formValueOf.selectPriceRange;

    if (formValueOf.cbSaveSearch) {
      this.authService.saveSearch(+localStorage.getItem('user_id'), rooms, type, size, priceRange, location).toPromise().then(
        (res) => {
          this.openInfoModal('Info', 'Search saved successfully');
          this.searchForm.get('cbSaveSearch').reset();
        }
      );
    }

    this.service.search(rooms, type, size, priceRange, location).toPromise().then(
      (response: Ad[]) => {
        this.ads = response;
      },
      (err_response: HttpErrorResponse) => {
        this.ads = [];
        if (err_response.error.message != "Ad is not found") {
          this.openInfoModal('Error', err_response.error.message);
        }
      }
    );
  }

  public isAdLiked(ad: Ad) : boolean {
    if (this.user == null || this.user.favAds.length == 0) {
      return false;
    }

    let b = false;

    this.user.favAds.forEach(ad_id => {
      if (ad.ad_id == ad_id) {
        b = true;
        return;
      }
    });

    return b ? true : false;
  }

  public isOwnAd(ad: Ad) : boolean {
    if (this.user == null || this.user.ads.length == 0) {
      return false;
    }

    let b = false;

    this.user.ads.forEach(ad_element => {
      if (ad.ad_id == ad_element.ad_id) {
        b = true;
        return;
      }
    });

    return b ? true : false;
  }

  public isLoggedIn() {
    if (localStorage.getItem('token')) {
      return true;
    }

    return false;
  }

  public likeAd(ad: Ad) {
    const user_id: number = +localStorage.getItem('user_id');
    this.authService.addToFav(user_id, ad.ad_id).toPromise().then(
      (response) => {
        window.location.reload();
      },
      (err_response: HttpErrorResponse) => {
        this.openInfoModal('Error', err_response.error.message);
      }
    );
  }

  public dislikeAd(ad: Ad) {
    const user_id: number = +localStorage.getItem('user_id');
    this.authService.deleteAdFromFav(user_id, ad.ad_id).toPromise().then(
      (response) => {
        window.location.reload();
      },
      (err_response: HttpErrorResponse) => {
        this.openInfoModal('Error', err_response.error.message);
      }
    );
  }

  public viewInfo(ad: Ad) {
    this.authService.findUserByAdId(ad.ad_id).toPromise().then(
      (response: UserDetails) => {
        let userDetails: UserDetails = response;
        console.log(userDetails);
        this.openDetailsModal(ad, userDetails);
      },
      (err_response: HttpErrorResponse) => {
        this.openInfoModal('Error', err_response.error.message);
      }
    );
  }

  public openDetailsModal(ad: Ad, userDetails: UserDetails) {
    const modalRef = this.modalService.open(AdDetailsComponent, {
      ariaLabelledBy: 'modal-basic-title',
      centered: true,
      scrollable: true,
      size: "lg",
      backdrop: "static",
      keyboard: false 
    });

    modalRef.componentInstance.currentAd = ad;
    modalRef.componentInstance.userDetails = userDetails;

    modalRef.result.then((data) => {
      console.log(`AdDetailsComponent has been closed with: ${data}`);
    });
  }
}