import { Component, OnInit } from '@angular/core';
import { DriversFormComponent } from '../drivers-form/drivers-form.component';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenStorageService } from 'src/app/services/tokenStorage.service/token-storage.service';
import { DriverService } from 'src/app/services/driver.service/driver.service';
@Component({
  selector: 'app-drivers-table',
  templateUrl: './drivers-table.component.html',
  styleUrls: ['./drivers-table.component.css'],
})
export class DriversTableComponent implements OnInit {
  drivers: any;
  driverFormComp: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private driverService: DriverService,
    private tokenStorage: TokenStorageService
  ) {}
  ngOnInit(): void {
    this.drivers = JSON.parse(window.localStorage.getItem('drivers')!);
    this.driverFormComp = new DriversFormComponent(
      this.fb,
      this.router,
      this.driverService,
      this.tokenStorage
    );
  }
  /* -------------------------------------------------------------------------- */
  /*                                   refresh                                  */
  /* -------------------------------------------------------------------------- */
  refresh(): void {
    window.location.reload();
  }
  /* -------------------------------------------------------------------------- */
  /*                                   details                                  */
  /* -------------------------------------------------------------------------- */
  detailsFunc(driver: any) {
    this.driverFormComp.detailsFunc(driver);
  }
  /* -------------------------------------------------------------------------- */
  /*                                   delete                                   */
  /* -------------------------------------------------------------------------- */
  async deleteFunc(driverId: any) {
    var ele = document.getElementById(driverId)?.remove();
    console.log(ele);
    var token = this.tokenStorage.getToken();
    alert(token);
    await this.driverService.deleteDriverById(driverId, token);
  }
  /* -------------------------------------------------------------------------- */
  /*                                    edit                                    */
  /* -------------------------------------------------------------------------- */
  editFunc(driver: any) {
    this.driverFormComp.editFunc(driver);
  }
}
