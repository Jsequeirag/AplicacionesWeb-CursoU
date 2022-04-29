import { Injectable } from '@angular/core';
import Axios from 'axios';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class PaypalService {
  constructor() {}

  async createOrder(data: any, token: any) {
    console.log(data);
    var response: any;
    const config = {
      headers: {
        'x-access-token': token,
      },
    };

    await Axios.post(
      `${environment.apiUrl}/paypal/create-order`,
      data,
      config
    ).then((r) => {
      response = r;
    });

    console.log(response);
    window.location.href = response.data.links[1].href;
  }
}
