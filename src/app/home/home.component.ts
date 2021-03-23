import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AdvertisementService } from '../advertisement.service';
import { AuthService } from '../auth.service';
import { Ad } from '../models/ad';
import { Property } from '../models/property';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private example_property: Property = {property_id: 1,ad:null,roomNumber: 5,type:"jo",state:"omladozik a haz",size:1234 }
  private example_ad: Ad = { ad_id: 1, property: this.example_property, picture: "https://www.propertysupport.hu/wp-content/uploads/2020/11/property-support-ingatlan-tanacsadas-1.jpg", price: "1500000 Ft", location: "Budapest ...", details: null };
  public ads: Ad[] = [];
  public searchForm: FormGroup;
  public noAds: boolean = false;

  constructor(private service: AdvertisementService, private authService: AuthService, private formBuilder: FormBuilder) {
    this.searchForm = formBuilder.group({
      inputSize: new FormControl('', []),
      inputRooms: new FormControl('', []),
      selectType: new FormControl('', []),
      selectPriceRange: new FormControl('100000+', [])
    });
  }

  ngOnInit(): void {
  }

  public getNoAds() : boolean {
    return this.noAds;
  }

  public setNoAds(bool: boolean) {
    this.noAds = bool;
  }

  public search() {
    let size: number, rooms: number, type: string, priceRange: string;
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

    priceRange = formValueOf.selectPriceRange;

    this.service.search(rooms, type, size, priceRange).subscribe(
      (response: Ad[]) => {
        console.log(response);
        this.setNoAds(false);
        this.ads = response;
      },
      (err_response) => {
        this.ads = [];
        if (err_response.error.message == "Ad is not found") {
          this.setNoAds(true);
        }
        else {
          alert(err_response.error.message);
        }
      }
    )
  }

  public likeAd(ad: Ad) {
    console.log(ad.details);
  }

  public viewInfo(ad: Ad) {
    console.log(ad.details);
  }
}