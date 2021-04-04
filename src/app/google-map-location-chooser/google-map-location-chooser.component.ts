import { MapsAPILoader } from '@agm/core';
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-google-map-location-chooser',
  templateUrl: './google-map-location-chooser.component.html',
  styleUrls: ['./google-map-location-chooser.component.css']
})
export class GoogleMapLocationChooserComponent implements OnInit {
  public bpLat = 47.49801;
  public bpLng = 19.03991;
  public zoom = 12;
  private latitude;
  private longitude;
  private geoCoder;
  
  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder;

      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
 
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
 
          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
        });
      });
    });
  }

  closeModal(sendData) {
    this.activeModal.close(sendData);
  }

  saveLocation(){
    const data = {
      latitude: this.latitude,
      longitude: this.longitude
    }
    console.log(`google map location chooser component: Lat: ${this.latitude}, Lng: ${this.longitude}`);
    this.activeModal.close(data);
  }
  mapClicked(event: any) {

  }
}
