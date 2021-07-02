function initMap() {
    //var directionsService = new google.maps.DirectionsService();
    //var directionsRenderer = new google.maps.DirectionsRenderer();
    var peninsula = new google.maps.LatLng(41.237, -81.553);
    var mapOptions = {
      center: peninsula,
      zoom: 14,
      mapId: 'f195a7ab0618472c'
    };
    //var map = new google.maps.Map(document.getElementById('map'), mapOptions);
    //directionsRenderer.setMap(map);
    const bikeLayer = new google.maps.BicyclingLayer();
    bikeLayer.setMap(map);
}
