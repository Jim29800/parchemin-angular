import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductService } from '../../services/product/product.service';
import { Globals } from '../../globals';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  uuid :string;
  error :string;
  constructor(public ProductService: ProductService, 
    public Globals: Globals,
    public router: Router, 
    private activatedRoute: ActivatedRoute) 
    {
      this.activatedRoute.queryParams.subscribe(params => {
        this.uuid = params['product'];
        console.log(this.uuid)
      });
  }

  delete(uuid) {
    this.ProductService.deleteProduct(uuid)
      .subscribe(event => {
        this.router.navigate(["/product-list"]);
      },
        error => {
          this.error = 'Une erreur est survenue lors de la suppression.'
          // console.log(error)
        }
      );
  }

  ngOnInit() {
  }

}
