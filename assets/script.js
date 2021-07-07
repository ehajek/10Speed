
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

// If get your location is clicked
// Then prompt modal to allow to get location
// if yes then prompted with chrome to get location
// Once Allow location is selected, modal should close
// then show position info should display position on screen

var x = document.getElementById("displayposition");
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  x.innerHTML = "Latitude: " + position.coords.latitude +
  "<br>Longitude: " + position.coords.longitude;
}


// function showPosition(currentCity) {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(function(position) {
//       var positionInfo = "(" + "Latitude: " + position.coords.latitude + ", " + "Longitude: " + position.coords.longitude + ")";
//       console.log(positionInfo);


//     });
//   }
  


// function geocodeLatLng(geocoder, map, infowindow) {
//   const input = document.getElementById("latlng").value;
//   const latlngStr = input.split(",", 2);
//   const latlng = {
//     lat: parseFloat(latlngStr[0]),
//     lng: parseFloat(latlngStr[1]),
//   };
//   geocoder
//     .geocode({ location: latlng })
//     .then((response) => {
//       if (response.results[0]) {
//         map.setZoom(11);
//         const marker = new google.maps.Marker({
//           position: latlng,
//           map: map,
//         });
//         infowindow.setContent(response.results[0].formatted_address);
//         infowindow.open(map, marker);
//       } else {
//         window.alert("No results found");
//       }
//     })
//     .catch((e) => window.alert("Geocoder failed due to: " + e));
// }






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

document.getElementById("getLocation").addEventListener("click", showPosition)
// document.getElementById("no-btn").addEventListener("click", closeModal)
// document.getElementById("yes-btn").addEventListener("click", showPosition)







function initMap() {
    //var directionsService = new google.maps.DirectionsService();
    //var directionsRenderer = new google.maps.DirectionsRenderer();
    var peninsula = new google.maps.LatLng(41.237, -81.553);
    var mapOptions = {
      center: peninsula,
      zoom: 14,
      mapId: 'f195a7ab0618472c'
    };
    
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    //directionsRenderer.setMap(map);
    const bikeLayer = new google.maps.BicyclingLayer();
    bikeLayer.setMap(map);
}

function calcRoute() {
  var start = document.getElementById('start').value;
  var end = document.getElementById('end').value;
  var request = {
    origin: start,
    destination: end,
    travelMode: 'BICYCLING'
  };
  directionsService.route(request, function(result, status) {
    if (status == 'OK') {
      directionsRenderer.setDirections(result);
    }
  });
}




















// function createPhotoMarker(place) {
//     var photos = place.photos;
//     if (!photos) {
//       return;
//     }
//     var marker = new google.maps.Marker({
//       map: map,
//       position: place.geometry.location,
//       title: place.name,
//       icon: photos[0].getUrl({maxWidth: 35, maxHeight: 35})
//     });
//   }