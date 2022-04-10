import { Injectable } from '@angular/core';
import Axios from 'axios';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class DriverService {
  constructor() {}
  async getDriversById(driverId: any, token: any) {
    var response;
    const config = {
      headers: {
        'x-access-token': token,
      },
    };
    await Axios.get(`${environment.apiUrl}/driver/${driverId}`, config).then(
      (r) => {
        response = r.data;
        console.log(response);
      }
    );
    return response;
  }
}
