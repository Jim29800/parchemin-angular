import { Injectable } from '@angular/core';

import { Globals } from '../globals';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(private globals: Globals, private http : HttpClient ) { }

  login(username, password) {
    let url: string = this.globals.url + "login_check";
    return this.http.post(url,
      {
        "username" : username,
        "password" : password
      })
      .pipe(
        map(data => 
        localStorage.setItem('token', data["token"])
          )
      )
      ;
  }

  logout(): void {
    localStorage.removeItem('token');
  }
  isLoggedIn(){
    if (localStorage.getItem('token') === null) {
      return false;
    }else{
      return true;
    }
  }
  private parseToken() {
    var token = localStorage.getItem('token');
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }
  getUsername(){
    return this.parseToken()["username"];
  }
}