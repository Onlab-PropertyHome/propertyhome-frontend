import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdvertisementService } from 'src/app/services/advertisement.service';
import { AmazonService } from 'src/app/services/amazon.service';
import { AuthService } from 'src/app/services/auth.service';

import { EditAdModalComponent } from './edit-ad-modal.component';

describe('EditAdModalComponent', () => {
  let component: EditAdModalComponent;
  let fixture: ComponentFixture<EditAdModalComponent>;

  const authServiceStub = {};
  const advertisementServiceStub = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAdModalComponent ],
      providers: [
        { provide: AdvertisementService, useValue: advertisementServiceStub },
        { provide: AuthService, useValue: authServiceStub },
        NgbActiveModal,
        NgbModal,
        AmazonService,
        FormBuilder
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAdModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
