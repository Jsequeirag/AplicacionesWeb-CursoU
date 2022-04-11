import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DriverService } from 'src/app/services/driver.service/driver.service';
import { UserService } from 'src/app/services/user.service/user.service';
import { TokenStorageService } from 'src/app/services/tokenStorage.service/token-storage.service';

@Component({
  selector: 'app-driverperfil',
  templateUrl: './driverperfil.component.html',
  styleUrls: ['./driverperfil.component.css'],
})
export class DriverperfilComponent implements OnInit {
  form: FormGroup;
  user: any;
  token: any;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private driverService: DriverService,
    private userService: UserService,
    private tokenStorage: TokenStorageService
  ) {
    this.user = this.tokenStorage.getUser();
    this.token = this.tokenStorage.getToken();
    this.form = this.fb.group({
      username: [this.user.username, Validators.required],
      password: [this.user.password, Validators.required],
      name: [this.user.name, Validators.required],
      lastname: [this.user.lastname, Validators.required],
      email: [this.user.email, Validators.required],
      birthdate: [this.user.birthdate, Validators.required],
      location: [this.user.location, Validators.required],
      phone: [this.user.phone, Validators.required],
    });
  }

  ngOnInit() {
    this.chargeForm();
  }

  async chargeForm() {
    var user = await this.tokenStorage.getUser();
    var birthdate = <HTMLInputElement>document.getElementById('editbirthdate')!;
    var date = new Date(user.birthdate);
    birthdate.type = 'text';
    birthdate.value =
      `${date.getFullYear()}-0${date.getMonth()}-0${date.getDay()}`.toString();
    birthdate.type = 'date';
  }
  async edit() {
    var data = {
      _id: this.user._id,
      username: this.form.value.username,
      password: this.form.value.password,
      name: this.form.value.name,
      lastname: this.form.value.lastname,
      email: this.form.value.email,
      birthdate: this.form.value.birthdate,
      location: this.form.value.location,
      phone: this.form.value.phone,
    };
    var updated = await this.userService.update(data, this.token);
    this.tokenStorage.saveUser(updated);
    this.refresh();
  }
  refresh(): void {
    window.location.reload();
  }
}
