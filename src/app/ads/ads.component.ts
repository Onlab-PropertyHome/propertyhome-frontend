import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Ad } from '../models/ad';
import { User } from '../models/user';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css']
})
export class AdsComponent implements OnInit {
  private example_ad: Ad = { ad_id: 0, property: null, picture: "https://www.propertysupport.hu/wp-content/uploads/2020/11/property-support-ingatlan-tanacsadas-1.jpg", price: "1500000 Ft", location: "Budapest ...", details: null }; 
  public ads: Ad[] = [ this.example_ad ];

  constructor(private service: AuthService) { }

  ngOnInit(): void {
    let id: number = +localStorage.getItem('user_id');
    this.service.getById(id)
    .subscribe(
      (user: User) => {
        //this.ads = user.ads;
        console.log(this.ads.length);
      },
      (err_response) => {
        alert(err_response.error.message);
      }
    )
  }

  public add() {
    let ad: Ad = {
      ad_id: this.ads.length,
      property: null,
      picture: "https://24.p3k.hu/app/uploads/2019/06/73900269_123-1024x576.jpg",
      price: "közpénz",
      location: "Felcsút",
      details: "Mészáros Lőrinc otthona"
    }
    this.ads.push(ad);
  }

  public edit(ad: Ad) {
    // TODO
  }

  public delete(ad: Ad) {
    let ad_id = ad.ad_id;
    this.ads = this.ads.filter(ad => ad.ad_id !== ad_id)
  }

}
