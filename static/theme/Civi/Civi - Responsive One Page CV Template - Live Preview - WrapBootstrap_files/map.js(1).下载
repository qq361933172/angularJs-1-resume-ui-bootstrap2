$(document).ready(function() {

  function googleMap() {
    var styles = [
      {featureType: 'water', elementType: 'geometry', stylers: [{hue: '#bbbbbb'}, {saturation: -100}, {lightness: -4}, {visibility: 'on'}]},
	
	  {featureType: 'landscape', elementType: 'geometry', stylers: [{hue: '#eeeeee'}, {saturation: -100}, {lightness: 39}, {visibility: 'on'}]},
		
	  {featureType: 'road', elementType: 'geometry', stylers: [{hue: '#ffffff'}, {saturation: -100}, {lightness: 100}, {visibility: 'on'}]},
		
	  {featureType: 'poi', elementType: 'geometry', stylers: [{hue: '#dddddd'}, {saturation: -100}, {lightness: 39}, {visibility: 'on' }]} 
    ];

    var lat = $('#map').data("map-lat"), 
        lng = $('#map').data("map-lng"),	
        mark = $('#map').data("map-mark");

    var map = new GMaps ({
      el: '#map', 
      lat: lat, 
      lng: lng,
      zoom: 15,
      zoomControlOpt: {style : 'SMALL', position: 'TOP_LEFT'},
	  styles: styles
    });

    map.addMarker({
      lat: lat,
      lng: lng,
	  infoWindow: {
        content: mark
      }
    });
  };

  googleMap();

  $(window).resize(function() {
    googleMap();
  });

});