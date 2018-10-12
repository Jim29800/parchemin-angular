import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../../globals';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private globals: Globals) { }
  getUrl(){
    console.log(this.globals.url)
  }

}
