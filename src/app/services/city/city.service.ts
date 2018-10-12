import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../../globals';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private globals: Globals, private http: HttpClient) { }
  getCities() {
    let url: string = this.globals.url + "cities";
    return this.http.get(url)
      ;
  }
}
