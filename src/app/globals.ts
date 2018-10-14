import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
    url: string = 'http://127.0.0.1:8000/api/';
    urlImage: string = "http://127.0.0.1:8000/uploads/images/products/";
}