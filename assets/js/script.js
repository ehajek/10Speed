function initMap() {
  var peninsula = new google.maps.LatLng(41.237, -81.553);
  const map = new google.maps.Map(document.getElementById("map"), {
    center: peninsula,
    zoom: 14,
    mapId: 'f195a7ab0618472c'
  });
  infoWindow = new google.maps.InfoWindow();
  const locationButton = document.createElement("button");
  locationButton.textContent = "Get My Location";
  document.getElementById("location-button").appendChild(locationButton);
  locationButton.addEventListener("click", () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          infoWindow.setPosition(pos);
          infoWindow.setContent("Location found.");
          infoWindow.open(map);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos){
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
    ? "Error: The Geolocation service failed."
    : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}