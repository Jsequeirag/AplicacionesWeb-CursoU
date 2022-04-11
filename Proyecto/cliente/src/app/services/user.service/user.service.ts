import { Injectable } from '@angular/core';
import Axios from 'axios';

import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  async signIn(data: any) {
    var response;
    await Axios.post(`${environment.apiUrl}/auth/signin`, data).then((r) => {
      response = r;
    });
    return response;
  }
  async signUp(data: any) {
    var response;
    await Axios.post(`${environment.apiUrl}/auth/signup`, data).then((r) => {
      response = r.data;
    });
    return response;
  }
}
