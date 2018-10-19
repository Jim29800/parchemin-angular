import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category/category.service';
import { CityService } from '../../services/city/city.service';
import { TagService } from '../../services/tag/tag.service';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product/product.service';
import { Ng2ImgMaxService } from 'ng2-img-max';

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
    public router: Router,
    private ng2ImgMax: Ng2ImgMaxService
    ) { }
  
  postProduct(){
    this.formSent  = true;

    let tags = [];
    for (let index in this.tagSelected) {
      if (this.tagSelected[index] == true) {
        tags.push(index)
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
          // console.log(error);
          this.error = 'Erreur, veuillez vérifier les données saisies.'
        }
      );

  }


  onFileChange(event) {
    //preview de l'image
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;

      reader.readAsDataURL(file);
    }
    //resize & compress si besoin de l'image
    let image = event.target.files[0];
    this.ng2ImgMax.resizeImage(image, 1080, 720).subscribe(
      result => {
        // imageResized = new File([result], result.name);
        this.ng2ImgMax.compressImage(result, 0.8).subscribe(
          result2 => {
            let file = new File([result2], result2.name);
            let imageCompressed = { "target" : { "files" : [file] } };
            //transform base 64
            let result3 = fileUpload(imageCompressed);
            this.fileResult = result3;
          },
          error => {
            // console.log('Une erreur est survenu lors de l\'upload de l\'image', error);
          }
        );
      },
      error => {
        // console.log('Une erreur est survenu lors de l\'upload de l\'image', error);
      }
    );
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
