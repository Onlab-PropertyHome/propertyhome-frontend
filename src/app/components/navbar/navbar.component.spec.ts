import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';


import { AuthService } from 'src/app/services/auth.service';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  const authservicestub = {
    loggedIn: () => {return false;}
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
      imports:[RouterTestingModule],
      providers: [
        
        {provide:AuthService,useValue:authservicestub}
      ] 
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('login should be visible if user is not logged in.', () => {
    expect(fixture.debugElement.query(By.css("#login"))).toBeTruthy();
  });
  
  it('register should be visible if user is not logged in.', () => {
    expect(fixture.debugElement.query(By.css("#register"))).toBeTruthy();
  });

  it('profile should not be visible if user is not logged in.', () => {
    expect(fixture.debugElement.query(By.css("#profile"))).toBeFalsy();
  });
});
