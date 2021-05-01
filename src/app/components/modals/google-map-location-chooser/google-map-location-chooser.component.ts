import { MapsAPILoader } from '@agm/core';
import { Component, ElementRef, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InfoModalComponent } from '../info-modal/info-modal.component';

@Component({
  selector: 'app-google-map-location-chooser',
  templateUrl: './google-map-location-chooser.component.html',
  styleUrls: ['./google-map-location-chooser.component.css']
})
export class GoogleMapLocationChooserComponent implements OnInit {
  public zoom = 12;
  public latitude = 47.49801;
  public longitude = 19.03991;
  private geoCoder;
  public location: string = null;
  private map;
  
  @ViewChild('search')
  public searchElementRef: ElementRef;

  @Input('search')
  public searchBox;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    public activeModal: NgbActiveModal,
    private modalService: NgbModal
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
          this.getAddress(this.latitude, this.longitude);
        });
      });
    });
  }

  public openInfoModal(title: string, text: string) {
    const modalRef = this.modalService.open(InfoModalComponent, {
      ariaLabelledBy: 'modal-basic-title',
      centered: true,
      scrollable: true,
      backdrop: "static",
      keyboard: false 
    });

    modalRef.componentInstance.modal_title = title;
    modalRef.componentInstance.modal_text = text;

    modalRef.result.then((data) => {
      console.log(`InfoModalComponent has been closed with: ${data}`);
    });
  }

  closeModal(sendData) {
    this.activeModal.close(sendData);
  }

  public isLocationChoosen() {
    return location;
  }

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {

        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;

        this.zoom = 8;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }

  markerDragEnd($event: any) {
    this.latitude = $event.latLng.lat();
    this.longitude = $event.latLng.lng();
    this.getAddress(this.latitude, this.longitude);
    this.searchBox.value = this.location;  
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.location = results[0].formatted_address;
          
          console.log(`Location: ${this.location}`);
        } else {
          this.openInfoModal('Error', 'No results found');
        }
      } else {
        this.openInfoModal('Error', 'Geocoder failed due to: ' + status);
      }
 
    });
  }

  saveLocation() {
    const data = {
      location: this.location,
      latitude: this.latitude,
      longitude: this.longitude
    }
    console.log(`google map location chooser component: Lat: ${this.latitude}, Lng: ${this.longitude}`);
    this.closeModal(data);
  }

  public mapReadyHandler(map: google.maps.Map): void {
    this.map = map;
    this.map.mapClickListener = this.map.addListener('click', (e: google.maps.MouseEvent) => {
      this.ngZone.run(() => {
        this.latitude = e.latLng.lat();
        this.longitude = e.latLng.lng();
        this.getAddress(this.latitude, this.longitude);
      });
    });
  }
}
