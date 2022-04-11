import { Injectable } from '@angular/core';
declare var google: any;

@Injectable({
  providedIn: 'root',
})
export class GoogleplaceService {
  constructor() {}
  initAutocomplete(): any {
    var address = document.getElementById('address');
    var autocomplete = new google.maps.places.Autocomplete(address);
  }
}
