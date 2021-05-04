import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AmazonService } from 'src/app/services/amazon.service';
import { AuthService } from 'src/app/services/auth.service';

import { ProfiledetailsComponent } from './profiledetails.component';

describe('ProfiledetailsComponent', () => {
  let component: ProfiledetailsComponent;
  let fixture: ComponentFixture<ProfiledetailsComponent>;

  const authServiceStub = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfiledetailsComponent ],
      imports: [ RouterModule.forRoot([]) ],
      providers: [
        RouterTestingModule,
        { provide: AuthService, useValue: authServiceStub },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {params: {id: '1'}}
          }
        },
        NgbModal,
        FormBuilder,
        AmazonService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfiledetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
