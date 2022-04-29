import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { GoogleplaceService } from 'src/app/services/googleplaces.services/googleplace.service';
import { VehicleService } from 'src/app/services/vehicle.service/vehicle.service';
import { TokenStorageService } from 'src/app/services/tokenStorage.service/token-storage.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaypalService } from 'src/app/services/paypal.service/paypal.service';
import { navbarHidden } from '../../utils/navbarHidden';
@Component({
  selector: 'app-ride',
  templateUrl: './ride.component.html',
  styleUrls: ['./ride.component.css'],
})
export class RideComponent implements OnInit {
  vehicles: any;
  user: any;
  token: any;
  constructor(
    private GoogleplaceService: GoogleplaceService,
    private vehicleService: VehicleService,
    private tokenStorage: TokenStorageService,
    public dialog: MatDialog
  ) {
    this.token = this.tokenStorage.getToken();
    this.user = this.tokenStorage.getUser();
    this.getVehiclesByStatus();
  }
  ngOnInit(): void {
    this.GoogleplaceService.initAutocomplete();
    this.GoogleplaceService.initMap();
    navbarHidden();
  }

  sendDestination(): any {
    var destinationInput = (<HTMLInputElement>(
      document.getElementById('address')!
    )).value;
    this.GoogleplaceService.inputSetDestination(destinationInput);
  }
  async getVehiclesByStatus() {
    this.vehicles = await this.vehicleService.getVehiclesbystatus(this.token);
  }

  async openDialog(vehicle: any) {
    const travelInfo = this.GoogleplaceService.getTravelInfo();
    console.log(travelInfo);
    this.dialog.open(DialogDataExampleDialog, {
      data: {
        vehicle: vehicle,
        driver: vehicle.drivers[0],
        user: this.user,
        vehiclePosition: vehicle.location,
        travelInfo,
      },
    });
  }
}
@Component({
  selector: 'dialog-data-example-dialog',
  templateUrl: 'dialog-data-example-dialog.html',
  styleUrls: ['./ride.component.css'],
})
export class DialogDataExampleDialog {
  driverDistance: any;
  driverDuration: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private GoogleplaceService: GoogleplaceService,
    private paypalService: PaypalService,
    private tokenStorage: TokenStorageService
  ) {}
  async ngOnInit() {
    await this.GoogleplaceService.googleMapDriver(this.data.vehiclePosition);
    const driverDurationAndDistance =
      this.GoogleplaceService.getDurationDistanceDriver();
    this.driverDistance = driverDurationAndDistance.driverDistance;
    this.driverDuration = driverDurationAndDistance.driverDuration;
    this.chanceDriverDistanAndDuration();
  }
  async paypayCreateOrder() {
    var token = this.tokenStorage.getToken();
    await this.paypalService.createOrder(this.data, token);
  }
  chanceDriverDistanAndDuration() {
    document.getElementById('driver-distance')!.innerText = this.driverDistance;
    document.getElementById('driver-duration')!.innerText = this.driverDuration;
  }
}
