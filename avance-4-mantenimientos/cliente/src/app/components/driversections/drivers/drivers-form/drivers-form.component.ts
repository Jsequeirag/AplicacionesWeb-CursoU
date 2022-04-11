import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DriverService } from 'src/app/services/driver.service/driver.service';
import { TokenStorageService } from 'src/app/services/tokenStorage.service/token-storage.service';
@Component({
  selector: 'app-drivers-form',
  templateUrl: './drivers-form.component.html',
  styleUrls: ['./drivers-form.component.css'],
})
export class DriversFormComponent implements OnInit {
  public form: FormGroup;
  token: any;
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private driverService: DriverService,
    private tokenStorage: TokenStorageService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      identification: ['', Validators.required],
      birthdate: ['', Validators.required],
      licenseclass: ['', Validators.required],
      explicense: ['', Validators.required],
      date: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    (<HTMLInputElement>document.getElementById('action')!).value = 'create';
  }
  /* -------------------------------------------------------------------------- */
  /*                                   refresh                                  */
  /* -------------------------------------------------------------------------- */
  refresh(): void {
    window.location.reload();
  }
  /* --------------------------------- details -------------------------------- */
  detailsFunc(driver: any) {
    alert(driver);
    document.getElementById('driver-form')!.style.display = 'none';
    document.getElementById('detail-form-container')!.style.display = 'flex';

    (<HTMLInputElement>document.getElementById('details-name')!).value =
      driver.name;
    (<HTMLInputElement>document.getElementById('details-lastname')!).value =
      driver.lastname;
    (<HTMLInputElement>(
      document.getElementById('details-identification')!
    )).value = driver.identification;
    (<HTMLInputElement>document.getElementById('details-birthdate')!).value =
      driver.birthdate;
    (<HTMLInputElement>document.getElementById('details-licenseclass')!).value =
      driver.licenseclass;
    (<HTMLInputElement>document.getElementById('details-explicense')!).value =
      driver.explicense;
  }
  /* -------------------------------------------------------------------------- */
  /*                                   create                                   */
  /* -------------------------------------------------------------------------- */
  async signup() {
    var data = {
      iduser: JSON.parse(sessionStorage.getItem('auth-user')!)._id,
      name: this.form.value.name,
      lastname: this.form.value.lastname,
      identification: this.form.value.identification,
      birthdate: this.form.value.birthdate,
      licenseclass: this.form.value.licenseclass,
      explicense: this.form.value.explicense,
    };
    console.log(data);
    var action = (<HTMLInputElement>document.getElementById('action')!).value;
    console.log(action);
    this.token = this.tokenStorage.getToken();
    if (action === 'create') {
      this.driverService.createDriver(data, this.token);
      alert('create');
    }
    if (action === 'edit') {
      var _id = (<HTMLInputElement>document.getElementById('editid')!).value;
      var name = (<HTMLInputElement>document.getElementById('editname')!).value;

      var lastname = (<HTMLInputElement>(
        document.getElementById('editlastname')!
      )).value;

      var identification = (<HTMLInputElement>(
        document.getElementById('editidentification')!
      )).value;
      var birthdate = (<HTMLInputElement>(
        document.getElementById('editbirthdate')!
      )).value;
      var licenseclass = (<HTMLInputElement>(
        document.getElementById('editlicenseclass')!
      )).value;

      var explicense = (<HTMLInputElement>(
        document.getElementById('editexplicense')!
      )).value;

      var newdata = {
        iduser: JSON.parse(sessionStorage.getItem('auth-user')!)._id,
        name,
        lastname,
        identification,
        licenseclass,
        birthdate,
        explicense,
      };
      console.log('new data', newdata);
      await this.driverService.updateDriversById(_id, newdata, this.token);
      alert('edit');
      this.refresh();
    }
  }
  /* -------------------------------------------------------------------------- */
  /*                                    edit                                    */
  /* -------------------------------------------------------------------------- */
  editFunc(driver: any) {
    alert(driver.explicense);
    /* ----------------------------- carga los datos ---------------------------- */
    (<HTMLInputElement>document.getElementById('editid')!).value = driver._id;
    (<HTMLInputElement>document.getElementById('editname')!).value =
      driver.name;
    (<HTMLInputElement>document.getElementById('editlastname')!).value =
      driver.lastname;

    (<HTMLInputElement>document.getElementById('editidentification')!).value =
      driver.identification;
    (<HTMLInputElement>document.getElementById('editlicenseclass')!).value =
      driver.licenseclass;
    var explincense = <HTMLInputElement>(
      document.getElementById('editexplicense')!
    );
    /* ------------------------------- exp license ------------------------------ */
    var date = new Date(driver.explicense);
    alert(date);
    explincense.type = 'text';
    explincense.value =
      `${date.getFullYear()}-0${date.getMonth()}-0${date.getDay()}`.toString();
    explincense.type = 'date';
    /* ----------------------------- bithdate input ----------------------------- */
    date = new Date(driver.birthdate);
    var birthdate = <HTMLInputElement>document.getElementById('editbirthdate')!;
    birthdate.type = 'text';
    birthdate.value =
      `${date.getFullYear()}-0${date.getMonth()}-0${date.getDay()}`.toString();
    birthdate.type = 'date';
    /* ------------------------ cambia de estado a editar ----------------------- */
    document.getElementById('message')!.innerText = 'Edit';
    (<HTMLInputElement>document.getElementById('action')!).value = 'edit';
    /* ---------------------- cambia estado los fomularios ---------------------- */
    document.getElementById('driver-form')!.style.display = 'flex';
    document.getElementById('detail-form-container')!.style.display = 'none';
  }
}
