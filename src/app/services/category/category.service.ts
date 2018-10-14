import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Globals } from '../../globals';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  token = localStorage.getItem('token');

  header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    "Authorization": "Bearer " + this.token,
  });

  constructor(private globals: Globals, private http: HttpClient) { }

  getCategories() {
    let url: string = this.globals.url + "categories";
    return this.http.get(url,
      {
        headers: this.header
      })
      ;
  }
}
