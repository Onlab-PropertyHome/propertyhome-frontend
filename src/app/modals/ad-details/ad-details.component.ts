import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Ad } from 'src/app/models/ad';

@Component({
  selector: 'app-ad-details',
  templateUrl: './ad-details.component.html',
  styleUrls: ['./ad-details.component.css']
})
export class AdDetailsComponent implements OnInit {
  public currentAd: Ad = null;

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    
  }

  closeModal(sendData) {
    this.activeModal.close(sendData);
  }
}
