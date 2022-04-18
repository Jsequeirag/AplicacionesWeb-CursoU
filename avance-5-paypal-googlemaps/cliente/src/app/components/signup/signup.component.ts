import '../utils/selectRole';
import { Component, OnInit } from '@angular/core';
import { navbarHidden } from '../utils/navbarHidden';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service/user.service';
import { TokenStorageService } from 'src/app/services/tokenStorage.service/token-storage.service';
import { SelectRoleService } from 'src/app/services/selectRole.service/select-role.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GoogleplaceService } from 'src/app/services/googleplaces.services/googleplace.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  response: any;
  constructor(
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private GoogleplaceService: GoogleplaceService,
    private selectRoleService: SelectRoleService,
    private tokenStorage: TokenStorageService
  ) {
    this.form = this.fb.group({
      user: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      birthdate: ['', Validators.required],
      location: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    navbarHidden();

    this.GoogleplaceService.initAutocomplete();
  }

  async signup() {
    const dataInput = {
      username: this.form.value.user,
      password: this.form.value.password,
      email: this.form.value.email,
      name: this.form.value.name,
      lastname: this.form.value.lastname,
      birthdate: this.form.value.birthdate,
      location: this.form.value.location,
      phone: this.form.value.phone,
      roles: document.getElementById('roles')?.textContent,
    };
    console.log(dataInput);
    this.response = await this.userService.signUp(dataInput);

    if (this.response.auth === false) {
      console.log(this.response);
      window.document.getElementById('message')!.hidden = false;
    } else {
      this.tokenStorage.saveToken(this.response.token);
      this.tokenStorage.saveUser(this.response.usersaved);
      if (this.response.usersaved.roles === 'driver') {
        alert('driver');
        this.router.navigateByUrl('/dashboard');
      } else {
        alert('rider');
        this.router.navigateByUrl('/dashboard');
      }
    }
  }
  driver = () => {
    this.selectRoleService.driver();
  };
  rider = () => {
    this.selectRoleService.rider();
  };
}
