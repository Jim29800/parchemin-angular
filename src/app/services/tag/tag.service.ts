import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../../globals';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private globals: Globals, private http: HttpClient) { }

  getTags() {
    let url: string = this.globals.url + "tags";
    return this.http.get(url)
      ;
  }
}
