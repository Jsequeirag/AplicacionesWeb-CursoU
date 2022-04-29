import { Component, OnInit } from '@angular/core';
import { navbarHidden } from '../../utils/navbarHidden';
import { TokenStorageService } from 'src/app/services/tokenStorage.service/token-storage.service';
import { VehicleService } from 'src/app/services/vehicle.service/vehicle.service';
import { DriverService } from 'src/app/services/driver.service/driver.service';
@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css'],
})
export class VehiclesComponent implements OnInit {
  id: any;
  token: any;
  vehiclesAvailable = false;
  vehicles: any;
  drivers: any;
  constructor(
    private tokenStorage: TokenStorageService,
    private vehicleService: VehicleService,
    private driverService: DriverService
  ) {}

  ngOnInit(): void {
    this.getVehiclesById();
    this.getDriverById();
  }

  async getVehiclesById() {
    this.id = this.tokenStorage.getUser()._id;
    this.token = this.tokenStorage.getToken();
    this.vehicles = await this.vehicleService.getVehiclesbyId(
      this.id,
      this.token
    );
    window.localStorage.setItem('vehicles', JSON.stringify(this.vehicles));
    this.vehiclesAvailable = true;
  }
  async getDriverById() {
    this.id = this.tokenStorage.getUser()._id;
    this.token = this.tokenStorage.getToken();
    this.drivers = await this.driverService.getDriversById(this.id, this.token);
    window.localStorage.setItem('drivers', JSON.stringify(this.drivers));
  }
}
