import { Injectable } from '@angular/core';

declare var google: any;
var googleDriver: any;
var googleInvoice: any;
var googleMap: any;
var userPosition: any;
var distance: any;
var driverDistance: any;
var driverDuration: any;
var cost: any;
var duration: any;
var destination: any;
var mapOptions: any;
var getNameLatLng: any;
var displayCoordinates: any;
var directionsService: any;
var directionsDisplay: any;
var marker: any;
var driverMarker: any;
let geocoder: any;
@Injectable({
  providedIn: 'root',
})
export class GoogleplaceService {
  constructor() {}
  /* ------------------------- inicializa la API place ------------------------ */
  initAutocomplete(): any {
    var address = document.getElementById('address');
    new google.maps.places.Autocomplete(address);
  }
  /* ------------------------------- travel info ------------------------------ */
  getTravelInfo() {
    const travelInfo = {
      cost,
      distance,
      duration,
      destination,
      userPosition,
    };
    return travelInfo;
  }
  /* -------------------------- DurationDistanceDriver ------------------------- */
  getDurationDistanceDriver() {
    const driverRoute = { driverDistance, driverDuration };
    console.log(driverRoute);
    return driverRoute;
  }
  /* -------------------------------------------------------------------------- */
  /*                        inicializa el mapa de chofer                        */
  /* -------------------------------------------------------------------------- */
  async googleMapDriver(vehiclePosition: any) {
    alert(JSON.stringify(vehiclePosition));
    alert(JSON.stringify(userPosition));
    mapOptions = {
      center: vehiclePosition,
      zoom: 15,
      mapTypeId: 'roadmap',
    };

    /* --------------------------- map estatico visual -------------------------- */

    googleDriver = new google.maps.Map(
      document.getElementById('googleMapDriver'),
      mapOptions
    );
    var driverDirectionsService = new google.maps.DirectionsService();
    var driverDirectionsDisplay = new google.maps.DirectionsRenderer();
    driverDirectionsDisplay.setMap(googleDriver);
    /* ------------------------ parametros origen destino ----------------------- */
    var request = {
      origin: vehiclePosition,
      destination: userPosition,
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.IMPERIAL,
      provideRouteAlternatives: true,
    };
    await driverDirectionsService.route(request, (result: any, status: any) => {
      if (status === google.maps.DirectionsStatus.OK) {
        driverDistance = result.routes[0].legs[0].distance.text;
        driverDuration = result.routes[0].legs[0].duration.text;
        driverDirectionsDisplay.setDirections(result);
        googleDriver.setCenter(result);
      } else {
        driverDirectionsDisplay.setDirections({ routes: [] });
        googleDriver.setCenter(vehiclePosition);
        console.log(status);
      }
    });
  }
  /* -------------------------------------------------------------------------- */
  /*                                 invoice map                                */
  /* -------------------------------------------------------------------------- */
  async googleMapInvoice(route: any) {
    alert(JSON.stringify(route.origin));

    mapOptions = {
      center: route.origin,
      zoom: 15,
      mapTypeId: 'roadmap',
    };

    /* --------------------------- map estatico visual -------------------------- */

    googleInvoice = await new google.maps.Map(
      document.getElementById('googleMapInvoice'),
      mapOptions
    );
    var driverDirectionsService = new google.maps.DirectionsService();
    var driverDirectionsDisplay = new google.maps.DirectionsRenderer();
    await driverDirectionsDisplay.setMap(googleInvoice);
    /* ------------------------ parametros origen destino ----------------------- */
    var request = {
      origin: route.origin,
      destination: route.destination,
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.IMPERIAL,
      provideRouteAlternatives: true,
    };
    await driverDirectionsService.route(request, (result: any, status: any) => {
      if (status === google.maps.DirectionsStatus.OK) {
        alert('ok');
        driverDistance = result.routes[0].legs[0].distance.text;
        driverDuration = result.routes[0].legs[0].duration.text;
        driverDirectionsDisplay.setDirections(result);
        googleInvoice.setCenter(result);
      } else {
        driverDirectionsDisplay.setDirections({ routes: [] });
        googleInvoice.setCenter(route.origin);
        console.log(status);
      }
    });
  }

  /* -------------------------------------------------------------------------- */
  /*                        Inicializa el map de usuario                        */
  /* -------------------------------------------------------------------------- */
  async initMap() {
    navigator.geolocation.getCurrentPosition(this.setMyPosition);
    geocoder = new google.maps.Geocoder();
  }
  setMyPosition(position: any): any {
    userPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    mapOptions = {
      center: userPosition,
      zoom: 14,
      mapTypeId: 'roadmap',
    };
    /* -------------------------------------------------------------------------- */
    /*                                 map estatico visual                                */
    /* -------------------------------------------------------------------------- */
    googleMap = new google.maps.Map(
      document.getElementById('googleMap'),
      mapOptions
    );

    marker = new google.maps.Marker({
      position: userPosition,
      title: 'Hello World!',
    });
    marker.setMap(googleMap);

    directionsService = new google.maps.DirectionsService();
    directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(googleMap);

    google.maps.event.addListener(googleMap, 'click', function (event: any) {
      displayCoordinates(event.latLng); //marca la ruta en el mapa
      getNameLatLng(event.latLng); // e el input coloca el lugar de las coordenadas
    });
  }
  /* -------------------------------------------------------------------------- */
  /*                    Cambia destino con el texto del input                    */
  /* -------------------------------------------------------------------------- */
  async inputSetDestination(address: any) {
    await getNameGeoCode(address);
    //destination = {lat:destinationParam.geometry.};

    var request = {
      origin: userPosition,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.IMPERIAL,
      provideRouteAlternatives: true,
    };

    directionsService.route(request, (result: any, status: any) => {
      distance = result.routes[0].legs[0].distance.text;
      duration = result.routes[0].legs[0].duration.text;
      chanceDistanceAndCostInput();
      if (status === google.maps.DirectionsStatus.OK) {
        console.log(status);
        directionsDisplay.setDirections(result);
      } else {
        directionsDisplay.setDirections({ routes: [] });
        googleMap.setCenter(userPosition);
        console.log(status);
      }
    });
  }
}
/* -------------------------------------------------------------------------- */
/*               cambia el input cuando se hace clic en el mapa               */
/* -------------------------------------------------------------------------- */
getNameLatLng = function (pnt: any) {
  var lat = pnt.lat();
  lat = lat.toFixed(4);
  var lng = pnt.lng();
  lng = lng.toFixed(4);
  geocoder.geocode(
    {
      address: lat + ',' + lng,
    }, //address: recibe un string
    function (results: any, status: any) {
      if (status == 'OK') {
        var element = <HTMLInputElement>document.getElementById('address')!;
        console.log(results[0].geometry.location);
        element.value = results[0].formatted_address;
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    }
  );
};
/* -------------------------------------------------------------------------- */
/*                 obtener las cordenadas apartir de un nombre                */
/* -------------------------------------------------------------------------- */
async function getNameGeoCode(address: any) {
  await geocoder.geocode(
    {
      address: address,
    }, //address: recibe un string
    function (results: any, status: any) {
      if (status == 'OK') {
        destination = {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
        };
        console.log(results[0]);
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    }
  );
}
/* -------------------------------------------------------------------------- */
/*                            mostrar mapa con ruta                           */
/* -------------------------------------------------------------------------- */
displayCoordinates = function (pnt: any) {
  marker.setMap(null);
  var lat = pnt.lat();
  lat = lat.toFixed(4);
  var lng = pnt.lng();
  lng = lng.toFixed(4);
  destination = { lat: pnt.lat(), lng: pnt.lng() };
  console.log('Latitude: ' + lat + '  Longitude: ' + lng);
  var request = {
    origin: userPosition,
    destination: destination,
    /* waypoints: [
      {
        location: { lat: 10.47, lng: -84.439 },
        stopover: false,
      },
    ],*/

    travelMode: google.maps.TravelMode.DRIVING,
    unitSystem: google.maps.UnitSystem.IMPERIAL,
    provideRouteAlternatives: true,
  };

  directionsService.route(request, (result: any, status: any) => {
    distance = result.routes[0].legs[0].distance.text;
    duration = result.routes[0].legs[0].duration.text;
    chanceDistanceAndCostInput();
    if (status === google.maps.DirectionsStatus.OK) {
      console.log(status);
      directionsDisplay.setDirections(result);
      googleMap.setCenter(result);
    } else {
      directionsDisplay.setDirections({ routes: [] });
      googleMap.setCenter(userPosition);
      console.log(status);
    }
  });
};
/* -------------------------------------------------------------------------- */
/*                   coloca vaalores a la informacion del viaje                 */
/* -------------------------------------------------------------------------- */
function chanceDistanceAndCostInput() {
  var distanceInput = <HTMLInputElement>(
    document.getElementById('distance-input')!
  );
  distanceInput.value = distance;
  var costInput = <HTMLInputElement>document.getElementById('cost-input')!;
  cost = distance.replace('mi', '');
  cost = cost.replace(',', '.');
  costInput.value = (cost * 300).toString();
  cost = cost * 300;
  var durationInput = <HTMLInputElement>(
    document.getElementById('duration-input')!
  );
  durationInput.value = duration;
}
