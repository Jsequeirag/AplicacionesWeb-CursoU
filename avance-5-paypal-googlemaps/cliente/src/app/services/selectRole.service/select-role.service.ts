import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SelectRoleService {
  constructor() {}
  driver = () => {
    const roleElement = window.document.getElementById('roles');
    roleElement!.innerHTML = 'driver';
    const driverElement = window.document.getElementById('driver');
    driverElement!.style.backgroundColor = 'rgb(85, 180, 95)';
    const riderElement = window.document.getElementById('rider');
    riderElement!.style.backgroundColor = 'rgb(228, 228, 228)';
  };
  rider = () => {
    const roleElement = window.document.getElementById('roles');
    roleElement!.innerHTML = 'rider';
    const riderElement = window.document.getElementById('rider');
    riderElement!.style.backgroundColor = 'rgb(85, 180, 95)';
    const driverElement = window.document.getElementById('driver');
    driverElement!.style.backgroundColor = 'rgb(228, 228, 228)';
  };
}
