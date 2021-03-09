import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User, UserLoginDTO } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = "https://onlab-alberletdb.herokuapp.com/";

  constructor(private httpClient: HttpClient, private router: Router) { }

  public register(user: User) {

    return this.httpClient.post(
      this.baseUrl + "register",
      user,
      {
        responseType: 'text' as 'json'
      }
    );
  }

  public login(user: UserLoginDTO) {
    return this.httpClient.post(
      this.baseUrl + "login",
      user,
      {
        responseType: 'text' as 'json'
      }
    );
  }

  public logoutUser() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  public loggedIn() {
    return !!localStorage.getItem('token');
  }

  public getById(id: number): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}getUserDTO/${id}`);
  }
}
