import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSliderModule } from '@angular/material/slider';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SharedModule } from './components/shared/shared.module';
import { InfoComponent } from './components/index/info/info.component';
import { IndexComponent } from './components/index/index/index.component';
import { TestimonialsComponent } from './components/index/testimonials/testimonials.component';
import { ContactComponent } from './components/index/contact/contact.component';
@NgModule({
  declarations: [AppComponent, NavbarComponent, InfoComponent, IndexComponent, TestimonialsComponent, ContactComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSliderModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
