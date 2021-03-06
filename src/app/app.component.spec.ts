import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {} from 'jasmine';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { tokenGetter } from './app.module';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: tokenGetter,
            allowedDomains: ["https://onlab-alberletdb.herokuapp.com/api/*", "http://localhost:8080/api/*"],
            disallowedRoutes: []
          }
        })
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        NgbModal,
        { provide: Router, useValue: RouterTestingModule }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'propertyhome-frontend'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('propertyhome-frontend');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('propertyhome-frontend app is running!');
  });
});