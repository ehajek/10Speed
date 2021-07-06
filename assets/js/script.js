function initMap() {
  var peninsula = new google.maps.LatLng(41.237, -81.553);
  const map = new google.maps.Map(document.getElementById("map"), {
    center: peninsula,
    zoom: 14,
    mapId: 'f195a7ab0618472c'
  });
  const bikeLayer = new google.maps.BicyclingLayer();
  bikeLayer.setMap(map);
}

function showPosition() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var positionInfo = "(" + "Latitude: " + position.coords.latitude + ", " + "Longitude: " + position.coords.longitude + ")";
      console.log(positionInfo);
    });
  } 
}