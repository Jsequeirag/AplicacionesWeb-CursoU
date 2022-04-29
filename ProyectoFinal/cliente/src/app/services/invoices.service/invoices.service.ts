import { Injectable } from '@angular/core';
import Axios from 'axios';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class InvoicesService {
  constructor() {}
  async getInvoicesById(data: any, token: any) {
    var response: any;
    const config = {
      headers: {
        'x-access-token': token,
      },
    };

    await Axios.get(`${environment.apiUrl}/invoices/${data}`, config).then(
      (r) => {
        response = r;
      }
    );

    return response.data;
  }
}
