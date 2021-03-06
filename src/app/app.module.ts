import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Ng2ImgMaxModule } from 'ng2-img-max';

import { Globals } from './globals'

import { AppComponent } from './app.component';
import { ProductNewComponent } from './product/product-new/product-new.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './auth/login/login.component';
import { ProductEditComponent } from './product/product-edit/product-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductNewComponent,
    ProductListComponent,
    HomepageComponent,
    LoginComponent,
    ProductEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    Ng2ImgMaxModule,
  ],
  providers: [Globals],
  bootstrap: [AppComponent]
})
export class AppModule { }
