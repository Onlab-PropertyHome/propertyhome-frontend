import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { AgmCoreModule } from '@agm/core';

import { MapComponent } from './map.component';

//AIzaSyDZE7e2s1AzvdbH4jk0zpQcc0_25Uvk4x8 adam
//AIzaSyAK3e2ZXqwNpbmSkN3JxWEkvcFZLmAhBCM
@NgModule({
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDZE7e2s1AzvdbH4jk0zpQcc0_25Uvk4x8'
    })
  ],
  providers: [],
  declarations:[MapComponent],
  exports: [MapComponent],
  bootstrap: [ MapComponent ]
})
export class MapModule { }
