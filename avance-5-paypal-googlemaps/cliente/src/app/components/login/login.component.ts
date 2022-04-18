import { navbarHidden } from '../utils/navbarHidden';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenStorageService } from 'src/app/services/tokenStorage.service/token-storage.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  response: any;
  form: FormGroup;
  constructor(
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private tokenStorageService: TokenStorageService
  ) {
    this.form = this.fb.group({
      user: ['', Validators.required],
      password: ['', Validators.required],
    });
  } //antes del render

  ngOnInit(): void {
    //despues del render
    navbarHidden();
  }
  async login() {
    const dataInput = {
      username: this.form.value.user,
      password: this.form.value.password,
    };
    this.response = await this.userService.signIn(dataInput);
    if (this.response) {
      window.document.getElementById('message')!.hidden = false;
    }
    if (this.response.data.auth) {
      this.router.navigateByUrl('/dashboard');
      this.tokenStorageService.saveToken(this.response.data.token);
      this.tokenStorageService.saveUser(this.response.data.user);
    }
  }
}
