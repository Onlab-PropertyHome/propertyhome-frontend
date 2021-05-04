import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { AdvertisementService } from 'src/app/services/advertisement.service';
import { AuthService } from 'src/app/services/auth.service';

import { FavoriteAdsComponent } from './favorite-ads.component';

describe('FavoriteAdsComponent', () => {
  let component: FavoriteAdsComponent;
  let fixture: ComponentFixture<FavoriteAdsComponent>;

  const authServiceStub = {
    getById: () => {
      return null;
    }
  };

  const advertisementServiceStub = {

  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoriteAdsComponent ],
      providers: [
        NgbModal,
        RouterTestingModule,
        { provide: AuthService, useValue: authServiceStub },
        { provide: AdvertisementService, useValue: advertisementServiceStub }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
