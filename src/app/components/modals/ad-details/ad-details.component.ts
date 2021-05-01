import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Ad } from 'src/app/models/ad';
import { UserDetails } from 'src/app/models/user';

@Component({
  selector: 'app-ad-details',
  templateUrl: './ad-details.component.html',
  styleUrls: ['./ad-details.component.css']
})
export class AdDetailsComponent implements OnInit {
  public currentAd: Ad = null;
  public userDetails: UserDetails = null;

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void { }

  closeModal(sendData) {
    this.activeModal.close(sendData);
  }

  GetSliderStyle(url) {
    return {
      height: '300px',
      background: `url('${url}') 80% 80% no-repeat`,
      backgroundSize: 'cover'
    };
  }
}
