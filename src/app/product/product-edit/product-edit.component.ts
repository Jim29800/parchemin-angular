import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductService } from '../../services/product/product.service';
import { Globals } from '../../globals';
import { CategoryService } from '../../services/category/category.service';
import { CityService } from '../../services/city/city.service';
import { TagService } from '../../services/tag/tag.service';
import { Ng2ImgMaxService } from 'ng2-img-max';

let fileUpload = require('fuctbase64');

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  uuid :string;
  error :string;

  // Récupération des données de l'api
  categories: object = [{ id: 0, name: "Récupération des catégories en cours..." }];
  cities: object = [{ id: 0, name: "Récupération des villes en cours..." }];
  tags: object;
  product :any;

  //Attribution des données pour le formulaire
  category: string;
  city: string;
  tagSelected = [];
  title: string;
  ref: string;
  description: string;
  urlImage : string;
  selectedFile: File;
  fileResult: any;

  //Aperçu de l'image
  imageSrc;

  // Information si le formulaire est envoyer
  formSent = false;

  constructor(public ProductService: ProductService, 
    public CategoryService: CategoryService,
    public CityService: CityService,
    public TagService: TagService,
    public Globals: Globals,
    public router: Router, 
    private activatedRoute: ActivatedRoute,
    private ng2ImgMax: Ng2ImgMaxService
    ) 
    {
      this.activatedRoute.queryParams.subscribe(params => {
        this.uuid = params['product'];
      });
  }
  editProduct(){

    this.formSent = true;

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
    } else {
      image = null;
    }
    // console.log(this.fileResult['__zone_symbol__value'])
    this.ProductService.patchProduct(this.uuid, this.title, this.description, this.ref, this.category, this.city, tags, image)
      .subscribe(event => {
        this.router.navigate(["/product-list"]);
      },
        error => {
          // console.log(error);
          this.formSent = false;
          this.error = 'Erreur, veuillez vérifier les données saisies.'
        }
      );
  }
  deleteProduct() {
    this.ProductService.deleteProduct(this.uuid)
      .subscribe(event => {
        this.router.navigate(["/product-list"]);
      },
        error => {
          this.error = 'Une erreur est survenue lors de la suppression.'
          // console.log(error)
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
            let imageCompressed = { "target": { "files": [file] } };
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
    this.ProductService.getProduct(this.uuid).subscribe(
      data => {
        this.product = data;
        // console.log(data)
        for (let index in data['tags']) {
          this.tagSelected[data['tags'][index]['id']] = true
        }
        this.title = data['title'];
        this.ref = data['ref'];
        this.description = data['description'];
        this.city = data['city']['id'];
        this.category = data['category']['id'];
        if (data['image'] {
          this.urlImage = this.Globals.urlImage + data['image'];
        }
        this.formSent = false;  
      }
    );
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
