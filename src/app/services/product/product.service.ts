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

  post(title, description, ref, category, city, tags, image) {
    let url: string = this.globals.url + "products";

    return this.http.post(url,
      {
        "title": title,
        "description": description,
        "ref": ref,
        "category": category,
        "city": city,
        "tags": tags,
        "img" : image
        
      },
      {
        headers: this.header
      })
      // .pipe(
      //   map(data =>
      //     console.log(data)
      //   )
      // )
      ;
  }
}
