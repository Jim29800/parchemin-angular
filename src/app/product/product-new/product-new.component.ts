import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category/category.service';
import { CityService } from '../../services/city/city.service';
import { TagService } from '../../services/tag/tag.service';
import { ProductService } from '../../services/product/product.service';
// import * as fileUpload from 'fuctbase64';
let fileUpload = require('fuctbase64');

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.css']
})
export class ProductNewComponent implements OnInit {

  categories : object = [{ id: 0, name: "Récupération des catégories en cours..." }];
  cities : object = [{ id: 0, name: "Récupération des villes en cours..." }];
  tags : object =[{ id: 0, name: "Récupération des tags en cours..." }];

  category : string;
  city : string;
  tagSelected = [] ;

  title : string;
  ref : string;
  description : string;

  selectedFile: File;
  fileResult: any;

  imageSrc;
  
  constructor(
    public CategoryService: CategoryService, 
    public CityService: CityService, 
    public TagService: TagService,
    public ProductService: ProductService
    ) { }
  
  postProduct(){
    let tags = [];
    for (let i = 0; i < this.tagSelected.length; i++) {
      if (this.tagSelected[i] == true) {
        tags.push(i);
      }
      
    }
    const uploadData = new FormData();
    uploadData.append('imageFile', this.selectedFile)

    // console.log(this.fileResult['__zone_symbol__value'])
    this.ProductService.post(this.title, this.description, this.ref, this.category, this.city, tags, this.fileResult['__zone_symbol__value'])
      .subscribe(event => {
        // console.log("event : " + event);
      },
        error => {
          // console.log(error);
        }
      );

  }


  onFileChange(event) {
    let result = fileUpload(event);
    this.fileResult = result;
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;

      reader.readAsDataURL(file);
    }
  }

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
