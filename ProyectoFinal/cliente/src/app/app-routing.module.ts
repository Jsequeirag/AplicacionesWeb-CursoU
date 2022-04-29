import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './components/index/index/index.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { IndexdashboardComponent } from './components/dashboards/indexdashboard/indexdashboard.component';
import { VehiclesComponent } from './components/driversections/vehicles/vehicles.component';
import { DriversComponent } from './components/driversections/drivers/drivers.component';
import { MyperfilComponent } from './components/ridersections/myperfil/myperfil.component';
import { RideComponent } from './components/ridersections/ride/ride.component';
import { InvoicesComponent } from './components/ridersections/invoices/invoices.component';
import { DriverperfilComponent } from './components/driversections/driverperfil/driverperfil.component';
import { ReportsComponent } from './components/driversections/reports/reports.component';
import { ValorationComponent } from './components/ridersections/valoration/valoration.component';
const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: IndexdashboardComponent },
  { path: 'dashboard/vehicles', component: VehiclesComponent },
  { path: 'dashboard/drivers', component: DriversComponent },
  { path: 'dashboard/riderperfil', component: MyperfilComponent },
  { path: 'dashboard/driverperfil', component: DriverperfilComponent },
  { path: 'dashboard/ride', component: RideComponent },
  { path: 'dashboard/riderinvoices', component: InvoicesComponent },
  { path: 'dashboard/reports', component: ReportsComponent },
  { path: 'dashboard/valoration', component: ValorationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
