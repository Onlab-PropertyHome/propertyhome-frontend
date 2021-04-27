import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbAlertModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RegistrationComponent } from './registration/registration.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { ProfiledetailsComponent } from './profiledetails/profiledetails.component';
import { HomeComponent } from './home/home.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { JwtModule } from '@auth0/angular-jwt';
import { AdsComponent } from './ads/ads.component';
import { AdvertisementService } from './services/advertisement.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AgmCoreModule } from '@agm/core';
import { MapComponent } from './map/map.component';
import { AdDetailsComponent } from './modals/ad-details/ad-details.component';
import { DeleteModalComponent } from './modals/delete-modal/delete-modal.component';
import { GoogleMapLocationChooserComponent } from './modals/google-map-location-chooser/google-map-location-chooser.component';
import { InfoModalComponent } from './modals/info-modal/info-modal.component';
import { AddAdModalComponent } from './modals/add-ad-modal/add-ad-modal.component';
import { EditAdModalComponent } from './modals/edit-ad-modal/edit-ad-modal.component';
import { AgmMarkerClustererModule } from '@agm/markerclusterer';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    NavbarComponent,
    LoginComponent,
    ProfiledetailsComponent,
    HomeComponent,
    PagenotfoundComponent,
    AdsComponent,
    MapComponent,
    GoogleMapLocationChooserComponent,
    AdDetailsComponent,
    DeleteModalComponent,
    InfoModalComponent,
    AddAdModalComponent,
    EditAdModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MatCheckboxModule,

    AgmCoreModule.forRoot({
      // AIzaSyAF_X3Ikvvllsi4OJTPAMK3FbwE4yxe1PE új
      // AIzaSyDZE7e2s1AzvdbH4jk0zpQcc0_25Uvk4x8 régi
      apiKey: 'AIzaSyDZE7e2s1AzvdbH4jk0zpQcc0_25Uvk4x8',
      libraries: ["places", "visualization"],
      apiVersion: 'quarterly'
    }),
    AgmMarkerClustererModule,
    NgbAlertModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["https://onlab-alberletdb.herokuapp.com/api/*", "http://localhost:8080/api/*"],
        disallowedRoutes: []
      }
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [AuthService, AdvertisementService],
  bootstrap: [AppComponent]
})
export class AppModule { }
