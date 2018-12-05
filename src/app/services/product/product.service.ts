import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Globals } from '../../globals';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  token = localStorage.getItem('token');

  header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    "Authorization": "Bearer " + this.token,
  });

  constructor(private globals: Globals, private http: HttpClient) { }

  post(title, description, category, city, tags, image) {
    let url: string = this.globals.url + "products";
    let data = {
      "title": title,
      "description": description,
      "category": category,
      "city": city,
      "tags": tags
    }
    if (image != null) {
      data["img"] = image;
    }
    return this.http.post(url,
      data,
      {
        headers: this.header
      })
      ;
  }
  patchProduct(uuid, title, description, category, city, tags, image) {
    let url: string = this.globals.url + "products/" + uuid;
    let data = {
      "title": title,
      "description": description,
      "category": category,
      "city": city,
      "tags": tags
    }
    if (image != null) {
      data["img"] = image;
    }
    return this.http.patch(url,
      data,
      {
        headers: this.header
      })


  }
  getCreatedProducts() {
    let url: string = this.globals.url + "products/created";
    return this.http.get(url,
      {
        headers: this.header
      })
      ;
  }
  getProduct(uuid) {
    let url: string = this.globals.url + "products/" + uuid;
    return this.http.get(url,
      {
        headers: this.header
      })
      ;
  }
  deleteProduct(uuid){
    let url: string = this.globals.url + "products/" + uuid;

    return this.http.delete(url,
      {
        headers: this.header
      })
      ;
  }
}
