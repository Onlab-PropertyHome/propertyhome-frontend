import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { AdvertisementService } from 'src/app/services/advertisement.service';
import { AuthService } from 'src/app/services/auth.service';

import { MapComponent } from './map.component';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  const authservicestub = {   
  }
  const adServicestub = {
    getall:() => of(null)
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapComponent ],
      providers:[
        NgbModal,
        {provide: AuthService,useValue:authservicestub},
          {provide:AdvertisementService,useValue:adServicestub}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('mapp should be visible', () => {
    expect(fixture.debugElement.query(By.css("#map"))).toBeTruthy();
  });
});
