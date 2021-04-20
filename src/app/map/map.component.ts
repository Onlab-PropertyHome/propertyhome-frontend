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

  public list: Ad[];
  bpLat = 47.49801;
  bpLng = 19.03991;
  zoom = 12;
  public Circles = [];

  markers = [];

  lat = 51.678418;
  lng = 7.809007;
  circle_radius: number = 450;

  constructor(private adService: AdvertisementService, private authService: AuthService, private modalService: NgbModal) {
    adService.getall().subscribe(
      (ads: Ad[]) => {
        this.list = ads;
        if (this.list.length > 0) {
          this.list.forEach(Ad => {
            this.markers.push({
              marker: new Marker(Ad.property.lat, Ad.property.lng),
              ad: Ad
            })

            this.Circles.push({
              lat: Ad.property.lat,
              lng: Ad.property.lng,
              radius: this.circle_radius,
              fillColor: 'red'

            })
          });
        }
      }
    );
  }

  radiusincrease() {
    this.Circles.forEach(element => {
      element.radius += 50;

    });

  }

  radiusdecrease() {
    this.Circles.forEach(element => {
      if (element.radius > 50)
        element.radius -= 50;

    });
  }


  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async highlight() {

    this.Circles.forEach(async element => {

      element.fillColor = "green"; console.log("green");
    });
    await this.delay(2000);

    this.Circles.forEach(async element => {

      element.fillColor = "red"; console.log("red");
    });

  }

  async highlight2() {
    this.Circles.forEach(element => {
      element.fillColor = "orange";
    });
    for (let i = 0; i < 20; i++) {
      this.Circles.forEach(element => {
        element.radius += 50;
      });
      await this.delay(1);
    }
    for (let i = 0; i < 20; i++) {
      this.Circles.forEach(element => {
        element.radius -= 50;
      });
      await this.delay(1);
    }
    this.Circles.forEach(element => {
      element.fillColor = "blue";
    });
    await this.delay(200)
    this.Circles.forEach(element => {
      element.fillColor = "red";
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


  ngOnInit(): void { }

}
