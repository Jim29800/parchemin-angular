import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category/category.service';
import { CityService } from '../../services/city/city.service';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.css']
})
export class ProductNewComponent implements OnInit {

  categories: object = [{ id: 0, name: "Récupération des catégories en cours..." }];
  cities : object =[{ id: 0, name: "Récupération des villes en cours..." }];

  constructor(public CategoryService: CategoryService, public CityService: CityService) { }

  ngOnInit() {
    this.CategoryService.getCategories().subscribe(
      data => {
        this.categories = data
      }
    )
    this.CityService.getCities().subscribe(
      data => {
        this.cities = data
      }
    )
  }

}
