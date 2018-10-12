import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category/category.service';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.css']
})
export class ProductNewComponent implements OnInit {

  categories : object =[{ id: 1, name: "Récupération des catégories en cours..." }];

  constructor(public CategoryService: CategoryService) { }

  ngOnInit() {
    this.CategoryService.getCategories().subscribe(
      data => {
        this.categories = data
        console.log(this.categories)
      }
      )
  }

}
