import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { VehicleService } from 'src/app/services/vehicle.service/vehicle.service';
import { TokenStorageService } from 'src/app/services/tokenStorage.service/token-storage.service';

@Component({
  selector: 'app-vehicles-form',
  templateUrl: './vehicles-form.component.html',
  styleUrls: ['./vehicles-form.component.css'],
})
export class VehiclesFormComponent implements OnInit {
  public form: FormGroup;

  drivers: any;
  token: any;
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private vehicleService: VehicleService,
    private tokenStorage: TokenStorageService
  ) {
    this.form = this.fb.group({
      anio: ['', Validators.required],
      modelo: ['', Validators.required],
      placa: ['', Validators.required],
      color: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.drivers = JSON.parse(window.localStorage.getItem('drivers')!);
    (<HTMLInputElement>document.getElementById('action')!).value = 'create';
  }
  /* -------------------------------------------------------------------------- */
  /*                                   refresh                                  */
  /* -------------------------------------------------------------------------- */
  refresh(): void {
    window.location.reload();
  }
  /* -------------------------------------------------------------------------- */
  /*                                   detail                                   */
  /* -------------------------------------------------------------------------- */
  detailsFunc(vehicle: any) {
    alert(vehicle.color);
    vehicle.drivers.map((driver: any) => {
      return console.log(driver);
    });
    document.getElementById('vehicles-form')!.style.display = 'none';
    document.getElementById('detail-form-container')!.style.display = 'flex';
    (<HTMLInputElement>document.getElementById('platenumber')!).value =
      vehicle.platenumber;
    (<HTMLInputElement>document.getElementById('year')!).value = vehicle.year;
    (<HTMLInputElement>document.getElementById('model')!).value = vehicle.model;
    (<HTMLInputElement>document.getElementById('color')!).value = vehicle.color;
    (<HTMLInputElement>document.getElementById('valoration')!).value =
      vehicle.valoration;
    (<HTMLInputElement>document.getElementById('status')!).value =
      vehicle.status;
    (<HTMLInputElement>document.getElementById('drivers')!).value =
      vehicle.drivers.map((driver: any) => {
        return ` [ name:${
          driver.name + ' ' + ' lastname:' + driver.lastname
        } id:${driver.identification} ] `;
      });
  }

  /* -------------------------------------------------------------------------- */
  /*                                    edit                                    */
  /* -------------------------------------------------------------------------- */
  editFunc(vehicle: any) {
    alert(vehicle._id);
    /* ----------------------------- carga los datos ---------------------------- */
    (<HTMLInputElement>document.getElementById('editid')!).value = vehicle._id;
    (<HTMLInputElement>document.getElementById('editplatenumber')!).value =
      vehicle.platenumber;
    (<HTMLInputElement>document.getElementById('editplatenumber')!).required =
      false;
    (<HTMLInputElement>document.getElementById('edityear')!).value =
      vehicle.year;
    (<HTMLInputElement>document.getElementById('editmodel')!).value =
      vehicle.model;
    (<HTMLInputElement>document.getElementById('editcolor')!).value =
      vehicle.color;
    (<HTMLInputElement>document.getElementById('editcolor')!).removeAttribute(
      'aria-invalid'
    );
    /* -------------------------- recorre los choferes -------------------------- */
    for (let x = 0; x < vehicle.drivers.length; x++) {
      document
        .getElementById(vehicle.drivers[x]._id)
        ?.classList.add('mat-checkbox-checked');
    }
    /* ------------------------ cambia de estado a editar ----------------------- */
    document.getElementById('message')!.innerText = 'Edit';
    (<HTMLInputElement>document.getElementById('action')!).value = 'edit';
    /* ---------------------- cambia estado los fomularios ---------------------- */
    document.getElementById('vehicles-form')!.style.display = 'flex';
    document.getElementById('detail-form-container')!.style.display = 'none';
  }
  /* -------------------------------------------------------------------------- */
  /*                                   create                                   */
  /* -------------------------------------------------------------------------- */
  async signup() {
    var driversParam = [];
    var driversChecked = document.getElementsByClassName(
      'mat-checkbox-checked'
    );

    for (let x = 0; x < driversChecked.length; x++) {
      for (let x = 0; x < this.drivers.length; x++) {
        if (driversChecked[x].id === this.drivers[x]._id) {
          driversParam.push(this.drivers[x]);
        }
      }
    }
    var data = {
      idvehicleowner: JSON.parse(sessionStorage.getItem('auth-user')!)._id,
      year: this.form.value.anio,
      model: this.form.value.modelo,
      platenumber: this.form.value.placa,
      color: this.form.value.color,
      drivers: driversParam,
      valoration: 0,
      status: 'false',
      location: '*',
    };
    var action = (<HTMLInputElement>document.getElementById('action')!).value;

    this.token = this.tokenStorage.getToken();
    if (action === 'create') {
      this.vehicleService.createVehicule(data, this.token);
      alert('create');
    }
    if (action === 'edit') {
      alert(JSON.stringify(data.color));
      alert('edit');
      var _id = (<HTMLInputElement>document.getElementById('editid')!).value;
      var color = (<HTMLInputElement>document.getElementById('editcolor')!)
        .value;
      var model = (<HTMLInputElement>document.getElementById('editmodel')!)
        .value;
      var platenumber = (<HTMLInputElement>(
        document.getElementById('editplatenumber')!
      )).value;
      var year = (<HTMLInputElement>document.getElementById('edityear')!).value;
      var newdata = {
        _id,
        idvehicleowner: JSON.parse(sessionStorage.getItem('auth-user')!)._id,
        year,
        model,
        platenumber,
        color,
        drivers: driversParam,
        valoration: 0,
        status: 'false',
        location: '*',
      };
      console.log('new data', newdata);
      this.vehicleService.editVehicule(newdata, this.token);
      this.router.navigateByUrl('http://localhost:4200/dashboard/vehicles');
    }
  }
  async driver() {}
  async rider() {}
}
