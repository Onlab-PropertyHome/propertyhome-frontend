import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AdSearch } from '../models/adsearch';
import { AuthResponse } from '../models/response';
import { User, UserDetails } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = "https://onlab-alberletdb.herokuapp.com/api/";
  // private baseUrl: string = "http://localhost:8080/api/";

  constructor(private httpClient: HttpClient, private router: Router) { }

  public login(email: string, password: string) : Observable<AuthResponse> {
    const options = {
      params: new HttpParams().set('email', email).set('password', password)
    };

    return this.httpClient.post<AuthResponse>(`${this.baseUrl}login`, null, options);
  }

  public register(name: string, email: string, password: string, tel: string) : Observable<AuthResponse> {
    const options = {
      params: new HttpParams().set('name', name).set('email', email).set('password', password).set('tel', tel)
    };

    return this.httpClient.post<AuthResponse>(`${this.baseUrl}register`, null, options);
  }

  public logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    this.router.navigate(['/login']);
  }

  public loggedIn() {
    return !!localStorage.getItem('token');
  }

  public getById(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.baseUrl}user/${id}`);
  }

  public save(id: number, name: string, email: string, password: string, tel: string, picture: string): Observable<User> {
    let headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': "Bearer " + localStorage.getItem('token')
    });

    const options = {
      headers: headers_object,
      params: new HttpParams().set('name', name).set('email', email).set('password', password).set('tel', tel).set('picture', picture)
    };

    return this.httpClient.put<User>(`${this.baseUrl}user/edit/${id}`, null, options);
  }

  public delete(id: number) {
    let headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': "Bearer " + localStorage.getItem('token')
    });

    const options = {
      headers: headers_object
    };

    return this.httpClient.delete(`${this.baseUrl}user/delete/${id}`, options);
  }

  public addToFav(user_id: number, ad_id: number): Observable<User> {
    let headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': "Bearer " + localStorage.getItem('token')
    });

    const options = {
      headers: headers_object,
      params: new HttpParams().set('ad_id', ad_id.toString())
    };

    return this.httpClient.put<User>(`${this.baseUrl}user/${user_id}/favorites/add`, null, options);
  }

  public getFavAds(user_id: number) : Observable<number[]> {
    let headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': "Bearer " + localStorage.getItem('token')
    });

    const options = {
      headers: headers_object
    };

    return this.httpClient.get<number[]>(`${this.baseUrl}user/${user_id}/favorites`, options);
  }

  public deleteAdFromFav(user_id: number, ad_id: number) : Observable<User> {
    let headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': "Bearer " + localStorage.getItem('token')
    });

    const options = {
      headers: headers_object,
      params: new HttpParams().set('ad_id', ad_id.toString())
    };

    return this.httpClient.put<User>(`${this.baseUrl}user/${user_id}/favorites/delete`, null, options);
  }

  public findUserByAdId(ad_id: number) : Observable<UserDetails> {
    /*
    let headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': "Bearer " + localStorage.getItem('token')
    });*/

    const options = {
      // headers: headers_object,
      params: new HttpParams().set('ad_id', ad_id.toString())
    };

    return this.httpClient.get<UserDetails>(`${this.baseUrl}user/find`, options);
  }

  public testBody(userDetails: UserDetails) : Observable<any> {

    return this.httpClient.post<any>(`https://onlab-alberletdb.herokuapp.com/test2`, userDetails);
  }

  public saveSearch(id: number, rooms: number, type: string, size: number, price: string, location: string) {
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

    return this.httpClient.put<any>(`${this.baseUrl}user/${id}/savesearch`, null, options);
  }

  public getAllSavedSearch(id: number) : Observable<AdSearch[]> {
    return this.httpClient.get<AdSearch[]>(`${this.baseUrl}user/${id}/searches`);
  }

  public removeSavedSearch(user_id: number, id: number) {
    return this.httpClient.put<any>(`${this.baseUrl}user/${user_id}/removesearch/${id}`, null);
  }
}
