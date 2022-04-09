import { Injectable } from '@angular/core';
import Axios from 'axios';

import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  signIn(data: any): any {
    Axios.post(`${environment.apiUrl}/auth/signin`, data).then((response) => {
      console.log(response);
    });
  }
  async signUp(data: any) {
    var response;
    await Axios.post(`${environment.apiUrl}/auth/signup`, data).then((r) => {
      response = r.data;
    });
    return response;
  }
}
