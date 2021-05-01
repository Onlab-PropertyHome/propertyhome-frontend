import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { Ad } from '../models/ad';
import { AdSearch } from '../models/adsearch';

@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {

  private baseUrl: string = "https://onlab-alberletdb.herokuapp.com/api/";
   //private baseUrl: string = "http://localhost:8080/api/";
//this.aws.uploadFile(file);
  constructor(private httpClient: HttpClient) { }

  public getall() : Observable<Ad[]> {
    return this.httpClient.get<Ad[]>(`${this.baseUrl}ad/all`);
  }

  public getMultipleAds(ids: number[]) : Observable<Ad[]> {
    let responseArray: Observable<Ad>[] = [];

    ids.forEach(id => {
      responseArray.push(this.httpClient.get<Ad>(`${this.baseUrl}ad/${id}`));
    });

    return forkJoin(responseArray);
  }

  public search(rooms: number, type: string, size: number, price: string, location: string) : Observable<Ad[]> {
    let httpParams: HttpParams = new HttpParams();

    if (rooms) {
      httpParams = httpParams.set('roomNumber', rooms.toString());
    }

    if (type) {
      httpParams = httpParams.set('type', type);
    }

    if (size) {
      httpParams = httpParams.set('size', size.toString());
    }

    if (location) {
      httpParams = httpParams.set('location', location);
    }

    httpParams = httpParams.set('price', price);

    const options = {
      params: httpParams
    };
    
    return this.httpClient.get<Ad[]>(`${this.baseUrl}ad/find`, options);
  }

  public add(user_id: number, size: number, roomNumber: number, price: string, type: string, state: string, details: string, location:string, latitude:number, longitude:number, picture: string) : Observable<Ad> {
    let headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': "Bearer " + localStorage.getItem('token')
    });

    let httpParams: HttpParams = new HttpParams()
      .set('price', price).set('location', location).set('details', details).set('roomNumber', roomNumber.toString())
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
  
  public edit(ad_id: number, size: number, roomNumber: number, price: string, type: string, state: string, details: string, location:string, latitude:number, longitude:number, picture: string) : Observable<Ad> {
    let headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': "Bearer " + localStorage.getItem('token')
    });

    let httpParams: HttpParams = new HttpParams()
      .set('price', price).set('location', location).set('details', details).set('roomNumber', roomNumber.toString())
      .set('type', type).set('state', state).set('size', size.toString())
      .set('picture',picture)
      .set('lat',latitude.toString())
      .set('lng',longitude.toString());
      

    const options = {
      headers: headers_object,
      params: httpParams
    };

    return this.httpClient.put<Ad>(`${this.baseUrl}ad/edit/${ad_id}`, null, options);
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
