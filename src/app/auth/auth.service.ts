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
  isTokenExist(){
    if (localStorage.getItem('token') === null) {
      return false;
    }else{
      return true;
    }
  }
  getToken(): string {
    return localStorage.getItem('token');
  }

  getTokenExpirationDate(token: string): Date {
    const decoded = this.parseToken();

    if (decoded.exp === undefined) return null;

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) token = this.getToken();
    if (!token) return true;

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
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