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
  async update(data: any, token: any) {
    alert(JSON.stringify(data));
    const config = {
      headers: {
        'x-access-token': token,
      },
    };
    var response;
    await Axios.put(
      `${environment.apiUrl}/auth/update/${data._id}`,
      data,
      config
    )
      .then((r) => {
        response = r.data;
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
    return response;
  }
  async getUserBy(data: any) {
    var response;
    await Axios.post(`${environment.apiUrl}/auth/getuserbyid`, {
      _id: data._id,
    }).then((r) => {
      response = r;
    });
    return response;
  }
}
