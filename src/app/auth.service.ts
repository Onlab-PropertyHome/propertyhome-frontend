import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponse } from './models/response';
import { User, UserLoginDTO } from './models/user';

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
}
