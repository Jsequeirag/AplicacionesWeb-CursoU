import { Component, OnInit } from '@angular/core';
import { VehiclesFormComponent } from '../vehicles-form/vehicles-form.component';
import { VehicleService } from 'src/app/services/vehicle.service/vehicle.service';
import { TokenStorageService } from 'src/app/services/tokenStorage.service/token-storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-vehicles-tables',
  templateUrl: './vehicles-tables.component.html',
  styleUrls: ['./vehicles-tables.component.css'],
})
export class VehiclesTablesComponent implements OnInit {
  vehicles: any;
  vehicleFormComp: any;
  public form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private vehicleService: VehicleService,
    private tokenStorage: TokenStorageService
  ) {
    this.form = this.fb.group({
      id: ['', Validators.required],
      anio: ['', Validators.required],
      modelo: ['', Validators.required],
      placa: ['', Validators.required],
      color: ['', Validators.required],
      puntuacion: ['', Validators.required],
    });
    this.vehicles = JSON.parse(window.localStorage.getItem('vehicles')!);
    console.log(this.vehicles);
  }

  ngOnInit(): void {
    this.vehicleFormComp = new VehiclesFormComponent(
      this.fb,
      this.router,
      this.vehicleService,
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
  /*                                 detailsFunc                                */
  /* -------------------------------------------------------------------------- */
  detailsFunc(vehicle: any) {
    this.vehicleFormComp.detailsFunc(vehicle);
  }
  /* -------------------------------------------------------------------------- */
  /*                                 deleteFunc                                 */
  /* -------------------------------------------------------------------------- */
  async deleteFunc(vehicleId: any) {
    var ele = document.getElementById(vehicleId)?.remove();
    console.log(ele);
    alert(vehicleId);
    var token = this.tokenStorage.getToken();
    alert(token);
    await this.vehicleService.deleteVehiculeById(vehicleId, token);
  }
  /* -------------------------------------------------------------------------- */
  /*                                  editFunc                                  */
  /* -------------------------------------------------------------------------- */
  editFunc(vehicle: any) {
    this.vehicleFormComp.editFunc(vehicle);
  }
}
