import { Injectable } from '@angular/core';
import Axios from 'axios';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  constructor() {}
  /* -------------------------------------------------------------------------- */
  /*                                     get                                    */
  /* -------------------------------------------------------------------------- */
  async getVehiclesbyId(driverId: any, token: any) {
    var response;
    const config = {
      headers: {
        'x-access-token': token,
      },
    };
    await Axios.get(`${environment.apiUrl}/vehicle/${driverId}`, config).then(
      (r) => {
        response = r.data;
        console.log(response);
      }
    );
    return response;
  }
  /* -------------------------------------------------------------------------- */
  /*                                   create                                   */
  /* -------------------------------------------------------------------------- */
  async createVehicule(vehicle: any, token: any) {
    var response;
    const config = {
      headers: {
        'x-access-token': token,
      },
    };
    await Axios.post(`${environment.apiUrl}/vehicle`, vehicle, config).then(
      (r) => {
        response = r.data;
        console.log(response);
      }
    );
  }
  /* -------------------------------------------------------------------------- */
  /*                                   delete                                   */
  /* -------------------------------------------------------------------------- */
  async deleteVehiculeById(vehicleId: any, token: any) {
    var response;
    const config = {
      headers: {
        'x-access-token': token,
      },
    };
    await Axios.delete(
      `${environment.apiUrl}/vehicle/${vehicleId}`,
      config
    ).then((r) => {
      response = r.data;
      console.log(response);
    });
  }
  /* -------------------------------------------------------------------------- */
  /*                                    edit                                    */
  /* -------------------------------------------------------------------------- */
  async editVehicule(vehicle: any, token: any) {
    var response;
    const config = {
      headers: {
        'x-access-token': token,
      },
    };
    await Axios.put(
      `${environment.apiUrl}/vehicle/${vehicle._id}`,
      vehicle,
      config
    ).then((r) => {
      response = r.data;
      console.log(response);
    });
  }
}
