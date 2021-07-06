
var map;
var marker = false;

function initMap() {
  var peninsula = new google.maps.LatLng(41.237, -81.553);
  const map = new google.maps.Map(document.getElementById("map"), {
    center: peninsula,
    zoom: 14,
    mapId: 'f195a7ab0618472c'
  });
  const bikeLayer = new google.maps.BicyclingLayer();
  bikeLayer.setMap(map);
  google.maps.event.addListener(map, 'click', function(event) {                
      var clickedLocation = event.latLng;
      if(marker === false){
          marker = new google.maps.Marker({
              position: clickedLocation,
              map: map,
              draggable: true
          });
          google.maps.event.addListener(marker, 'dragend', function(event){
              markerLocation();
          });
      } else{
          marker.setPosition(clickedLocation);
      }
      markerLocation();
  });
}
     
function markerLocation(){
  var currentLocation = marker.getPosition();
  document.getElementById('lat').value = currentLocation.lat();
  document.getElementById('lng').value = currentLocation.lng();
}

google.maps.event.addDomListener(window, 'load', initMap);
 