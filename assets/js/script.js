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
  var apiKey = "c81ae0be75f519c71d1f855b95d48ec3"
  var uvApi = "https://api.openweathermap.org/data/2.5/onecall?&lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&units=imperial&appid=" + apiKey;
  fetch(uvApi).then(response => {
      return response.json()
}).then(data => {
  console.log(data) 
  //current conditions 
  CurrentConditions.innerHTML = "<strong>Currently</strong>"
  uvIndex.innerHTML = "UV Index: " + data.current.uvi
  windSpeed.innerHTML = "Wind: " + data.current.wind_speed + " MPH"
  Humidity.innerHTML = "Humidity: " + data.current.humidity + " %"
  Temperature.innerHTML = "Temp: " + data.current.temp + " ℉"
  var setImg = document.getElementById("icon")
  setImg.style.display = "initial"
  setImg.setAttribute("src", "https://openweathermap.org/img/w/" +  data.current.weather[0].icon + ".png")  
  console.log(data)

  
})


setConditions()
function setConditions() {
  fetch(uvApi).then(response => {
      return response.json()
}).then(data => {
  console.log(data)

  for(i = 0; i < 3; i++) {
      
      //console.log(card)  
      let x = 1 + i;
     
  
  console.log(data)
  
  ///show.style.display = "initial"
  const card = document.getElementsByClassName('card')[i];
  const dt  = document.getElementsByClassName('date')[i];
  const Icn = document.getElementsByClassName('icon')[i];
  const Tmp = document.getElementsByClassName('Temperature')[i];
  const Wnd = document.getElementsByClassName('windSpeed')[i];
  const Hum = document.getElementsByClassName('Humidity')[i];
  
  console.log(dt)
  var d = moment() .format('LT')
  
  
  d = d.split(":")
  dd = d[1].split(" ")
  ddd = Number(d[0]) + x
     
  var da = ddd  + " " + dd[1]
  d = da
  //d = da + d[2]
      console.log(x);
  
      var str = "ic" + x
  var show = document.getElementById(str);
  show.style.display = "initial"
  Icn.setAttribute("src", "https://openweathermap.org/img/w/" +  data.hourly[i].weather[0].icon + ".png")
  dt.innerHTML =  d
  Tmp.innerHTML = "Temp: " + data.hourly[i].temp + " ℉"; 
  Wnd.innerHTML = "Wind: " + data.hourly[i].wind_speed + " MPH"
  Hum.innerHTML = "Humidity: " + data.hourly[i].humidity + " %"

  //console.log(Tmp)
  card.appendChild(dt)
  card.appendChild(Wnd)
  card.appendChild(Tmp)
  card.appendChild(Hum)
  
  }

})
  
}
  //document.getElementById('startlat').value = originLocation.lat;
  //document.getElementById('startlng').value = originLocation.lng;
  //document.getElementById('lat').value = clickedLocation.lat;
  //document.getElementById('lng').value = clickedLocation.lng;

