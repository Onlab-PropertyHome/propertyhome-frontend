import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { AdvertisementService } from 'src/app/services/advertisement.service';
import { AuthService } from 'src/app/services/auth.service';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  const advertisementServiceStub = {

  };
  const authServiceStub = {

  };
  const formBuilderStub = {
    group: () => of()
  };
  const modalServiceStub = {

  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      providers: [
        { provide: AdvertisementService, useValue: advertisementServiceStub },
        { provide: AuthService, useValue: authServiceStub },
        { provide: FormBuilder, useValue: formBuilderStub },
        { provide: NgbModal, useValue: modalServiceStub }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
