
// function initMap() {
//   var peninsula = new google.maps.LatLng(41.237, -81.553);
//   const map = new google.maps.Map(document.getElementById("map"), {
//     center: peninsula,
//     zoom: 14,
//     mapId: 'f195a7ab0618472c'
//   });
//   const bikeLayer = new google.maps.BicyclingLayer();
//   bikeLayer.setMap(map);
// }






function showPosition() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var positionInfo = "(" + "Latitude: " + position.coords.latitude + ", " + "Longitude: " + position.coords.longitude + ")";
      console.log(positionInfo);
      console.log(position.coords.latitude);
      console.log(position.coords.longitude);


    });
  }
  
}

document.getElementById("getLocation").addEventListener("click", showPosition)
// function openModal() {
//   document.querySelector(".modal").setAttribute("class", "modal is-active")
// }

// function closeModal() {
//   document.querySelector(".modal").setAttribute("class", "modal")
// }

// function performStuff() {
//   console.log("context for position")
//   closeModal()
// }
// document.getElementById("no-btn").addEventListener("click", closeModal)
// document.getElementById("yes-btn").addEventListener("click", showPosition)











var latCords = 41.237
var lngCords = -81.553
var marker = false;
var originLocation = { lat: latCords, lng: lngCords };
function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: originLocation,
    zoom: 14,
    mapId: 'f195a7ab0618472c'
  });
  google.maps.event.addListener(map, 'click', function(event) {
    clickedLocation = event.latLng;
    function showPosition() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var positionInfo = "(" + "Latitude: " + position.coords.latitude + ", " + "Longitude: " + position.coords.longitude + ")";
          console.log(positionInfo);
          // console.log(position.coords.latitude);
          // console.log(position.coords.longitude);
          let latCords = position.coords.latitude
          let lngCords = position.coords.longitude
          let originLocation = { lat: latCords, lng: lngCords };
        });
      }
      
    }
    markerLocation(map);
  });
}
function markerLocation(mapMaker){
  var selectedLocation = clickedLocation;
  var directionsService = new google.maps.DirectionsService();
  var directionsRenderer = new google.maps.DirectionsRenderer({ map: mapMaker });
  directionsRenderer.setMap(mapMaker);
  directionsService.route({
    origin: originLocation,
    destination: clickedLocation,
    travelMode: google.maps.TravelMode.BICYCLING,
  }).then(function(Response){
    directionsRenderer.setDirections(Response)
  });
  document.getElementById('startlat').value = originLocation.lat;
  document.getElementById('startlng').value = originLocation.lng;
  document.getElementById('lat').value = selectedLocation.lat;
  document.getElementById('lng').value = selectedLocation.lng;
}




// function initialize() {
//   const fenway = { lat: 42.345573, lng: -71.098326 };
//   const map = new google.maps.Map(document.getElementById("map"), {
//     center: fenway,
//     zoom: 14,
//   });
//   const panorama = new google.maps.StreetViewPanorama(
//     document.getElementById("pano"),
//     {
//       position: fenway,
//       pov: {
//         heading: 34,
//         pitch: 10,
//       },
//     }
//   );
//   map.setStreetView(panorama);
// }

function showPosition() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var positionInfo = "(" + "Latitude: " + position.coords.latitude + ", " + "Longitude: " + position.coords.longitude + ")";
      console.log(positionInfo);

// start weather widget ------------------------------------------------------------------------------------------------------------------------------
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
  // end weather widget --------------------------------------------------------------------------------------------------------------------------

    });
  } 
}













