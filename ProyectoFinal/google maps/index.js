var mylatitude = { lat: 10.423, lng: -84.383 };
var mapOptions = {
  center: mylatitude,
  zoom: 10,
  mapTypeId: "roadmap",
};
function initMap() {
  /* -------------------------------------------------------------------------- */
  /*                                 map estatico visual                                */
  /* -------------------------------------------------------------------------- */
  var map = new google.maps.Map(
    document.getElementById("googleMap"),
    mapOptions
  );
  var directionsService = new google.maps.DirectionsService();

  var directionsDisplay = new google.maps.DirectionsRenderer();

  directionsDisplay.setMap(map);

  function calcRoute() {
    10.420392539233873, -84.38279948154208;
    var request = {
      origin: { lat: 10.42, lng: -84.382 },
      destination: { lat: 10.468, lng: -84.46 },
      waypoints: [
        {
          location: { lat: 10.47, lng: -84.439 },
          stopover: false,
        },
      ],

      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.IMPERIAL,
      provideRouteAlternatives: true,
    };
    directionsService.route(request, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        console.log(status);
        directionsDisplay.setDirections(result);
      } else {
        directionsDisplay.setDirections({ routes: [] });
        map.setCenter(mylatitude);
        console.log(status);
      }
    });
  }

  calcRoute();
  google.maps.event.addListener(map, "click", function (event) {
    displayCoordinates(event.latLng);
  });

  function displayCoordinates(pnt) {
    var lat = pnt.lat();
    lat = lat.toFixed(4);
    var lng = pnt.lng();
    lng = lng.toFixed(4);
    console.log("Latitude: " + lat + "  Longitude: " + lng);
  }
  /* -------------------------------------------------------------------------- */
  /*                            calcula si esta cerca                           */
  /* -------------------------------------------------------------------------- */
  marker1 = new google.maps.Marker({
    map,
    draggable: true,
    position: { lat: 10.42, lng: -84.382 },
  });
  var myPosition = { lat: 10.42, lng: -84.382 };

  console.log(marker1.getPosition());
  if (
    google.maps.geometry.spherical.computeDistanceBetween(
      myPosition,
      marker1.getPosition()
    ) < 50
  ) {
    alert("You have arrived!");
  }
}
