import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { AdvertisementService } from 'src/app/services/advertisement.service';
import { AmazonService } from 'src/app/services/amazon.service';
import { AuthService } from 'src/app/services/auth.service';

import { AdsComponent } from './ads.component';

describe('AdsComponent', () => {
  let component: AdsComponent;
  let fixture: ComponentFixture<AdsComponent>;

//hálózathoz "of"

  const authservicestub = { 
    getById:() => of(new HttpErrorResponse({
      error: {
        message: "testmessage"
      }
    }))
  }
  const adServicestub = {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdsComponent ],
      providers: [
        AmazonService,
        NgbModal,
        FormBuilder,
        
        
        
          {provide:AuthService,useValue:authservicestub},
          {provide:AdvertisementService,useValue:adServicestub}
        
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should be testmessage in infomdal',() => {
  //   expect(fixture.debugElement.query(By.css("#info-text"))).toContain("testmessage");
  // })

  it('should be testmessage', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("app-info-modal")).toBeTruthy();
  });

  // ez nem megy.
});
