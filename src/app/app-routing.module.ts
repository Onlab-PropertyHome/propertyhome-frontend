
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdsComponent } from './components/ads/ads.component';
import { FavoriteAdsComponent } from './components/favorite-ads/favorite-ads.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MapComponent } from './components/map/map.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { ProfiledetailsComponent } from './components/profiledetails/profiledetails.component';
import { RegistrationComponent } from './components/registration/registration.component';


const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "register", component: RegistrationComponent },
  { path: "login", component: LoginComponent },
  { path: "map", component: MapComponent},
  { path: "details/:id", component: ProfiledetailsComponent},
  { path: "ads", component: AdsComponent},
  { path: "home", component: HomeComponent},
  { path: "favorite-ads", component: FavoriteAdsComponent },
  { path: "**", component: PagenotfoundComponent },
  { path: "not-found", component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
           
  exports: [RouterModule]
})
export class AppRoutingModule { }
