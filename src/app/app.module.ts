import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { Globals } from './globals'

import { AppComponent } from './app.component';
import { AuthenticationComponent } from './authentication/authentication.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [Globals],
  bootstrap: [AppComponent]
})
export class AppModule { }
