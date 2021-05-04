import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdvertisementService } from 'src/app/services/advertisement.service';
import { AmazonService } from 'src/app/services/amazon.service';
import { AuthService } from 'src/app/services/auth.service';

import { DeleteModalComponent } from './delete-modal.component';

describe('DeleteModalComponent', () => {
  let component: DeleteModalComponent;
  let fixture: ComponentFixture<DeleteModalComponent>;

  const advertisementServiceStub = {};
  const authServiceStub = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteModalComponent ],
      providers: [
        NgbModal,
        NgbActiveModal,
        AmazonService,
        { provide: AuthService, useValue: authServiceStub },
        { provide: AdvertisementService, useValue: advertisementServiceStub }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
