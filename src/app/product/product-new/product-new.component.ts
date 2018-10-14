import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category/category.service';
import { CityService } from '../../services/city/city.service';
import { TagService } from '../../services/tag/tag.service';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product/product.service';

let fileUpload = require('fuctbase64');

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.css']
})
export class ProductNewComponent implements OnInit {

  // Récupération des données de l'api
  categories : object = [{ id: 0, name: "Récupération des catégories en cours..." }];
  cities : object = [{ id: 0, name: "Récupération des villes en cours..." }];
  tags : object =[{ id: 0, name: "Récupération des tags en cours..." }];

  // Données du formulaire
  category : string;
  city : string;
  tagSelected = [] ;
  title : string;
  ref : string;
  description : string;
  selectedFile: File;
  fileResult: any;

  //Aperçu de l'image
  imageSrc;
  
  // Information si le formulaire est envoyer
  formSent = false;
  // gestion des erreurs
  error : string ='';

  constructor(
    public CategoryService: CategoryService, 
    public CityService: CityService, 
    public TagService: TagService,
    public ProductService: ProductService,
    public router: Router
    ) { }
  
  postProduct(){
    this.formSent  = true;

    let tags = [];
    for (let i = 0; i < this.tagSelected.length; i++) {
      if (this.tagSelected[i] == true) {
        tags.push(i);
      }
      
    }

    //Si il y a une image, renvoi l'image sinon renvoie null
    let image
    if (this.fileResult != null) {
      image = this.fileResult['__zone_symbol__value']["base64"]
    }else{
      image = null;
    }

    // console.log(this.fileResult['__zone_symbol__value'])
    this.ProductService.post(this.title, this.description, this.ref, this.category, this.city, tags, image)
      .subscribe(event => {
        this.router.navigate(["/product-list"]);
      },
        error => {
          this.formSent = false;
          console.log(error);
          this.error = 'Erreur, veuillez vérifier les données saisies.'
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
