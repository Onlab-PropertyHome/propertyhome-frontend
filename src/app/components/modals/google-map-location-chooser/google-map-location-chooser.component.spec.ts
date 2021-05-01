import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleMapLocationChooserComponent } from './google-map-location-chooser.component';

describe('GoogleMapLocationChooserComponent', () => {
  let component: GoogleMapLocationChooserComponent;
  let fixture: ComponentFixture<GoogleMapLocationChooserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoogleMapLocationChooserComponent ]
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
