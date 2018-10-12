import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { Globals } from './globals'

import { AppComponent } from './app.component';
import { ProductNewComponent } from './product/product-new/product-new.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './auth/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductNewComponent,
    ProductListComponent,
    HomepageComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [Globals],
  bootstrap: [AppComponent]
})
export class AppModule { }
