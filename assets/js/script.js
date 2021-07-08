var latCords = 41.237
var lngCords = -81.553
var marker = false;
var originLocation = { lat: latCords, lng: lngCords };
var latitude = "";
var longitude = "";
function supports_geolocation() {
  return !!navigator.geolocation;
}
function get_location() {
  if ( supports_geolocation() ) {
    navigator.geolocation.getCurrentPosition(show_Location, handle_error);
  } else {
    // no native support;
	$("#msg").text('Your browser doesn\'t support geolocation!');
  }
}
function show_Location(position) {
  latitude = position.coords.latitude;
	longitude = position.coords.longitude;
  console.log(latitude);
  console.log(longitude);
};
console.log(latitude);
console.log(longitude);

function handle_error(err) {
  if (err.code == 1) {
    // user said no!
	$("#msg").text('You chose not to share your location.');
  }
}
get_location();
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: originLocation,
    zoom: 14,
    mapId: 'f195a7ab0618472c'
  });
  google.maps.event.addListener(map, 'click', function(event) {
    clickedLocation = event.latLng;
    markerLocation(map);
  });
}
function markerLocation(mapMaker){
  var directionsService = new google.maps.DirectionsService();
  var directionsRenderer = new google.maps.DirectionsRenderer({ map: mapMaker });
  console.log(latitude);
  console.log(longitude);
  originLocation = { lat: latitude, lng: longitude };
  directionsService.route({
    origin: originLocation,
    destination: clickedLocation,
    travelMode: google.maps.TravelMode.BICYCLING,
  },(response, status) => {
    console.log(response);
    console.log(status);}
  ).then(function(Response){
    directionsRenderer.setDirections(Response);
    var turnsContainer = document.getElementById("turns");
    var turnsEL = document.createElement('p');
    var tripDistance = Response.routes[0].legs[0].distance.text;
    var tripDuration = Response.routes[0].legs[0].duration.text;
    console.log(tripDistance);
    turnsContainer.innerHTML = "Distance: " + tripDistance + "<br/>" + "Duration: " +  tripDuration;
    turnsContainer.appendChild(turnsEL);
    steps = Response.routes[0].legs[0].steps;
    function turnByTurnSteps (steps) {
      var directions = document.getElementById('turnByTurn');
      directions.innerHTML = '';
      for (var i = 0; i < steps.length; i++) {
        console.log(steps[i].instructions);
        directions.innerHTML += '<br/><br/>' + steps[i].instructions + '<br/>' + steps[i].distance.text;
        }
      }
      turnByTurnSteps (Response.routes[0].legs[0].steps);
  })};

  //document.getElementById('startlat').value = originLocation.lat;
  //document.getElementById('startlng').value = originLocation.lng;
  //document.getElementById('lat').value = clickedLocation.lat;
  //document.getElementById('lng').value = clickedLocation.lng;

