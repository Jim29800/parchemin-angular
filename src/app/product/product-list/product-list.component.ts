import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { Globals } from '../../globals';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products;
  urlImage :string = this.Globals.urlImage;
  constructor(public ProductService: ProductService,public Globals : Globals) { }

  ngOnInit() {
    this.ProductService.getCreatedProducts().subscribe(
      data => {
        this.products = data;
      }
    ); 
  }

}
