import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category/category.service';
import { CityService } from '../../services/city/city.service';
import { TagService } from '../../services/tag/tag.service';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.css']
})
export class ProductNewComponent implements OnInit {

  categories : object = [{ id: 0, name: "Récupération des catégories en cours..." }];
  cities : object = [{ id: 0, name: "Récupération des villes en cours..." }];
  tags : object =[{ id: 0, name: "Récupération des tags en cours..." }];

  constructor(public CategoryService: CategoryService, public CityService: CityService, public TagService: TagService) { }

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
    this.TagService.getTags().subscribe(
      data => {
        this.tags = data
      }
    )
  }

}
