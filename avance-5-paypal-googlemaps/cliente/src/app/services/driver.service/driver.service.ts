import { Injectable } from '@angular/core';
import Axios from 'axios';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class DriverService {
  constructor() {}
  /* ----------------------------------- get ---------------------------------- */
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
  /* -------------------------------------------------------------------------- */
  /*                                     put                                    */
  /* -------------------------------------------------------------------------- */
  async updateDriversById(_id: any, driver: any, token: any) {
    console.log(driver);
    var response;
    const config = {
      headers: {
        'x-access-token': token,
      },
    };
    await Axios.put(
      `${environment.apiUrl}/driver/${_id}`,
       driver ,
      config
    ).then((r) => {
      response = r.data;
      console.log(response);
    });
    return response;
  }
  /* -------------------------------------------------------------------------- */
  /*                                   delete                                   */
  /* -------------------------------------------------------------------------- */
  async deleteDriverById(driverId: any, token: any) {
    var response;
    const config = {
      headers: {
        'x-access-token': token,
      },
    };
    await Axios.delete(`${environment.apiUrl}/driver/${driverId}`, config).then(
      (r) => {
        response = r.data;
        console.log(response);
      }
    );
  }
  /* -------------------------------------------------------------------------- */
  /*                                   create                                   */
  /* -------------------------------------------------------------------------- */
  async createDriver(driver: any, token: any) {
    var response;
    const config = {
      headers: {
        'x-access-token': token,
      },
    };
    await Axios.post(`${environment.apiUrl}/driver`, driver, config).then(
      (r) => {
        response = r.data;
        console.log(response);
      }
    );
  }
}
