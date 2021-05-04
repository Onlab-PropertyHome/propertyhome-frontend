import { MapsAPILoader } from '@agm/core';
import { NgZone } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { GoogleMapLocationChooserComponent } from './google-map-location-chooser.component';

describe('GoogleMapLocationChooserComponent', () => {
  let component: GoogleMapLocationChooserComponent;
  let fixture: ComponentFixture<GoogleMapLocationChooserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoogleMapLocationChooserComponent ],
      providers: [
        MapsAPILoader,
        NgZone,
        NgbActiveModal,
        NgbModal
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleMapLocationChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
