import { Component, OnInit } from '@angular/core';
import { navbarHidden } from '../../utils/navbarHidden';
import { DriverService } from 'src/app/services/driver.service/driver.service';
import { TokenStorageService } from 'src/app/services/tokenStorage.service/token-storage.service';
@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css'],
})
export class DriversComponent implements OnInit {
  token: any;
  id: any;
  drivers: any;
  driversAvailable = false;
  constructor(
    private driverService: DriverService,
    private tokenStorage: TokenStorageService
  ) {}

  ngOnInit(): void {
    navbarHidden();
    this.getDriverById();
  }
  async getDriverById() {
    this.id = this.tokenStorage.getUser()._id;
    this.token = this.tokenStorage.getToken();
    this.drivers = await this.driverService.getDriversById(this.id, this.token);
    window.localStorage.setItem('drivers', JSON.stringify(this.drivers));
    this.driversAvailable = true;
  }
}
