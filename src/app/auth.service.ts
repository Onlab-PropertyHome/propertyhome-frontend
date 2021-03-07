import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserLoginDTO } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = "https://onlab-alberletdb.herokuapp.com/";

  constructor(private httpClient: HttpClient) { }

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
    // TODO
    // return this.httpClient.post(
    //   this.baseUrl + "login",
    //   user,
    //   {
    //     responseType: 'text' as 'json'
    //   }
    // );
  }
}
