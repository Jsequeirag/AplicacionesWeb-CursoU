import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './components/index/index/index.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { IndexdashboardComponent } from './components/dashboards/indexdashboard/indexdashboard.component';
import { VehiclesComponent } from './components/driversections/vehicles/vehicles.component';
import { DriversComponent } from './components/driversections/drivers/drivers.component';
const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: IndexdashboardComponent },
  { path: 'dashboard/vehicles', component: VehiclesComponent },
  { path: 'dashboard/drivers', component: DriversComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
