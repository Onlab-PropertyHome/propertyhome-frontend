
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdsComponent } from './ads/ads.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MapComponent } from './map/map.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ProfiledetailsComponent } from './profiledetails/profiledetails.component';
import { RegistrationComponent } from './registration/registration.component';


const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "register", component: RegistrationComponent },
  { path: "login", component: LoginComponent },
  { path: "map", component: MapComponent},
  { path: "details/:id", component: ProfiledetailsComponent},
  { path: "ads", component: AdsComponent},
  { path: "home", component: HomeComponent},
  { path: "**", component: PagenotfoundComponent },
  { path: "not-found", component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
           
  exports: [RouterModule]
})
export class AppRoutingModule { }
