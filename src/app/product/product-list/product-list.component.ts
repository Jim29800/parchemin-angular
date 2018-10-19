import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { Router } from '@angular/router';
import { Globals } from '../../globals';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products : any;
  urlImage: string = this.Globals.urlImage;
  urlSite :string = this.Globals.url;

  constructor(
    public ProductService: ProductService, 
    public Globals: Globals, 
    public router: Router) { }


  ngOnInit() {
    this.ProductService.getCreatedProducts().subscribe(
      data => {
        this.products = data;
      }
    ); 
  }

}
