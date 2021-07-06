




// // <!-- Trigger/Open The Modal -->
// <button id="myBtn">Open Modal</button>

// <!-- The Modal -->
// <div id="myModal" class="modal">

//   <!-- Modal content -->
//   <div class="modal-content">
//     <span class="close">&times;</span>
    
//   </div>

// </div>







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

function openModal() {
  document.querySelector(".modal").setAttribute("class", "modal is-active")
}

function closeModal() {
  document.querySelector(".modal").setAttribute("class", "modal")
}

function performStuff() {
  console.log("context for position")
  closeModal()
}

document.getElementById("openModal").addEventListener("click", openModal)
document.getElementById("no-btn").addEventListener("click", closeModal)
document.getElementById("yes-btn").addEventListener("click", performStuff)
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