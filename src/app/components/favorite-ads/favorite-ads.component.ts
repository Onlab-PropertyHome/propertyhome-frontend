import { HttpErrorResponse } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Ad } from '../../models/ad';
import { User } from '../../models/user';
import { AdvertisementService } from '../../services/advertisement.service';
import { AuthService } from '../../services/auth.service';
import { InfoModalComponent } from '../modals/info-modal/info-modal.component';

@Component({
  selector: 'app-favorite-ads',
  templateUrl: './favorite-ads.component.html',
  styleUrls: ['./favorite-ads.component.css']
})
export class FavoriteAdsComponent implements OnInit {
  public favoriteAds: Ad[] = [];
  private user: User;
  private windowWidth: number;
  private isMobile = false;

  constructor(private authService: AuthService, private adService: AdvertisementService, private modalService: NgbModal, private router: Router) { }

  ngOnInit(): void {
    this.loadFavoriteAds();
  }

  private loadFavoriteAds() {
    const user_id: number = +localStorage.getItem('user_id');
    this.authService.getById(user_id).toPromise().then(
      (response: User) => {
        this.user = response;
        if (this.user.favAds.length != 0) {
          this.adService.getMultipleAds(this.user.favAds).toPromise().then(
            (response: Ad[]) => {
              this.favoriteAds = response;
              console.log(this.favoriteAds);
            },
            (err_response: HttpErrorResponse) => {
              this.openInfoModal('Error', err_response.error.message);
            }
          );
        } else {
          this.favoriteAds = [];
        }
      },
      (err_response: HttpErrorResponse) => {
        this.openInfoModal('Error', err_response.error.message);
        if(err_response.error.message === 'User not found.') {
          this.router.navigate(['/login']);
        }
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
      console.log(`InfoModalComponent has been closed with: ${data}`);
    });
  }

  @HostListener('window:resize', ['$event']) onResize(event) {
    this.windowWidth = event.target.innerWidth;
    if (this.windowWidth < 992)
      this.isMobile = true;
    else
      this.isMobile = false;
  }

  public removeAdFromFavorites(ad: Ad) {
    this.authService.deleteAdFromFav(this.user.id, ad.ad_id).toPromise().then(
      (response: User) => {
        this.loadFavoriteAds();
      }
    );
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

}
