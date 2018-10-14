import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Globals } from '../../globals';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  token = localStorage.getItem('token');

  header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    "Authorization": "Bearer " + this.token,
  });

  constructor(private globals: Globals, private http: HttpClient) { }
  getCities() {
    let url: string = this.globals.url + "cities";
    return this.http.get(url,
      {
        headers: this.header
      })
      ;
  }
}
