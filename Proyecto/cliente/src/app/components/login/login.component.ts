import { navbarHidden } from '../utils/navbarHidden';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
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
    const response = await this.userService.signIn(dataInput);
    if (!response) {
      window.document.getElementById('message')!.hidden = false;
    }
    if (response.auth) {
      /*if (data.user.role === 'user') {
        this.router.navigateByUrl('/perfil');
      }
      if (data.user.role === 'admin') {
        this.router.navigateByUrl('/dashboard');
      }*/
    }
  }
}
