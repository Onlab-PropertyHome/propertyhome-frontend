import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ad } from './models/ad';

@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {

  private baseUrl: string = "https://onlab-alberletdb.herokuapp.com/api/ad/";
  // private baseUrl: string = "http://localhost:8080/api/ad/";

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
    
    return this.httpClient.get<Ad[]>(`${this.baseUrl}find`, options);
  }
}
