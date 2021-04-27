import { AgmCircle, AgmMap } from '@agm/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdDetailsComponent } from '../modals/ad-details/ad-details.component';
import { InfoModalComponent } from '../modals/info-modal/info-modal.component';
import { Ad } from '../models/ad';
import { Marker } from '../models/marker';
import { UserDetails } from '../models/user';
import { AdvertisementService } from '../services/advertisement.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})


export class MapComponent implements OnInit {

  private map: google.maps.Map = null;
  private heatmap: google.maps.visualization.HeatmapLayer = null;

  public list: Ad[];
  bpLat = 47.49801;
  bpLng = 19.03991;
  zoom = 12;

  markers = [];

  lat = 51.678418;
  lng = 7.809007;

  constructor(private adService: AdvertisementService, private authService: AuthService, private modalService: NgbModal) { }


  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
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

  public viewInfo(ad: Ad) {
    this.authService.findUserByAdId(ad.ad_id).subscribe(
      (response: UserDetails) => {
        let userDetails: UserDetails = response;
        console.log(userDetails);
        this.openDetailsModal(ad, userDetails);
      },
      (err_response: HttpErrorResponse) => {
        this.openInfoModal('Error', err_response.error.message);
      }
    )
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

  onMapLoad(mapInstance: google.maps.Map) {
    this.map = mapInstance;
    const coords: google.maps.LatLng[] = [];

    this.adService.getall().toPromise().then(
      (response: Ad[]) => {
        this.list = response;


        this.list.forEach(ad => {
          coords.push(new google.maps.LatLng(ad.property.lat, ad.property.lng));
        });

        this.heatmap = new google.maps.visualization.HeatmapLayer({
          map: this.map,
          data: coords,
          radius: 50
        });
      }
    );
  }


  ngOnInit(): void {
    this.adService.getall().subscribe(
      (ads: Ad[]) => {
        this.list = ads;
        if (this.list.length > 0) {
          this.list.forEach(Ad => {
            this.markers.push({
              marker: new Marker(Ad.property.lat, Ad.property.lng),
              ad: Ad
            });
          });
        }
      }
    );
  }

}
