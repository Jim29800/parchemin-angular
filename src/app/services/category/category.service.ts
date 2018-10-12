import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../../globals';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private globals: Globals, private http: HttpClient) { }

  getCategories() {
    let url: string = this.globals.url + "categories";
    return this.http.get(url)
      ;
  }
}
