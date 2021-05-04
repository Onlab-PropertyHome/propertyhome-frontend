import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdvertisementService } from 'src/app/services/advertisement.service';
import { AmazonService } from 'src/app/services/amazon.service';

import { AddAdModalComponent } from './add-ad-modal.component';

describe('AddAdModalComponent', () => {
  let component: AddAdModalComponent;
  let fixture: ComponentFixture<AddAdModalComponent>;

  const advertisementServiceStub = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAdModalComponent ],
      providers: [
        NgbActiveModal,
        NgbModal,
        AmazonService,
        FormBuilder,
        { provide: AdvertisementService, useValue: advertisementServiceStub },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAdModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
