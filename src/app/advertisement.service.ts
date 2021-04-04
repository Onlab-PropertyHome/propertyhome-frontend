import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AmazonService } from './amazon.service';
import { Ad } from './models/ad';

@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {

  private baseUrl: string = "https://onlab-alberletdb.herokuapp.com/api/";
   //private baseUrl: string = "http://localhost:8080/api/";
//this.aws.uploadFile(file);
  constructor(private httpClient: HttpClient) { }

  public search(rooms: number, type: string, size: number, price: string) : Observable<Ad[]> {
    let httpParams: HttpParams = new HttpParams();

    if (rooms != null) {
      httpParams = httpParams.set('roomNumber', rooms.toString());
    }

    if (type != null) {
      httpParams = httpParams.set('type', type);
    }

    if (size != null) {
      httpParams = httpParams.set('size', size.toString());
    }

    httpParams = httpParams.set('price', price);

    const options = {
      params: httpParams
    };

    console.log(httpParams.get('price'));
    
    return this.httpClient.get<Ad[]>(`${this.baseUrl}ad/find`, options);
  }

  public add(user_id: number, size: number, roomNumber: number, price: string, type: string, state: string, details: string,latitude:number, longitude:number, picture: string) : Observable<Ad> {
    
    console.log(`Modal: Lat: ${latitude}, Lng: ${longitude}`);

    let headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': "Bearer " + localStorage.getItem('token')
    });

    let httpParams: HttpParams = new HttpParams()
      .set('price', price).set('location', "Budapest").set('details', details).set('roomNumber', roomNumber.toString())
      .set('type', type).set('state', state).set('size', size.toString())
      .set('picture',picture)
      .set('lat',latitude.toString())
      .set('lng',longitude.toString());
      

      

    const options = {
      headers: headers_object,
      params: httpParams
    };

    return this.httpClient.post<Ad>(`${this.baseUrl}user/${user_id}/addad`, null, options);
  }

  public delete(id: number) {
    let headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': "Bearer " + localStorage.getItem('token')
    });

    const options = {
      headers: headers_object
    };

    return this.httpClient.delete(`${this.baseUrl}ad/delete/${id}`, options);
  }
}
