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
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DriverComponent } from './components/dashboards/driver/driver.component';
import { IndexdashboardComponent } from './components/dashboards/indexdashboard/indexdashboard.component';
import { RiderComponent } from './components/dashboards/rider/rider.component';

import { VehiclesComponent } from './components/driversections/vehicles/vehicles.component';

import { VehiclesTablesComponent } from './components/driversections/vehicles/vehicles-tables/vehicles-tables.component';
import { VehiclesFormComponent } from './components/driversections/vehicles/vehicles-form/vehicles-form.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    InfoComponent,
    IndexComponent,
    TestimonialsComponent,
    ContactComponent,
    LoginComponent,
    SignupComponent,
    DriverComponent,
    IndexdashboardComponent,
    RiderComponent,

    VehiclesComponent,
    VehiclesTablesComponent,
    VehiclesFormComponent,
  ],
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
