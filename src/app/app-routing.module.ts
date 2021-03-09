
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MapComponent } from './map/map.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ProfiledetailsComponent } from './profiledetails/profiledetails.component';
import { RegistrationComponent } from './registration/registration.component';


const routes: Routes = [
  { path: "", redirectTo: "register", pathMatch: "full" },
  { path: "register", component: RegistrationComponent },
  { path: "login", component: LoginComponent },
  { path: "map", component: MapComponent},
  { path: "details/:id", component: ProfiledetailsComponent},
  { path: "home", component: HomeComponent},
  { path: "**", component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
           
  exports: [RouterModule]
})
export class AppRoutingModule { }
