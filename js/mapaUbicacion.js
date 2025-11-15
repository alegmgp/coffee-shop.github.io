/*coordenadas destino coffe-shop 40.320930,-3.870172 */
var destinoLatLng = L.latLng(40.320930,-3.870172);

//variable mapa y coordenadas y zoom
var mimapa = L.map('mapa').setView([40.320930,-3.870172], 13); 

//capa del mapa openstreetmap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>' 
}).addTo(mimapa);


//marcador posicion coffee-shop
var marcador = L.marker([40.320930,-3.870172]).addTo(mimapa); 

//Popups 
marcador.bindPopup(`<p><b>COFFEE-SHOP</b><p><p>C/Xxxxxxxxx, nº xx, xxxxxxxx(Madrid)</p><p>+34 91-000-00-00 // 600-00-00-00</p><p>contacto-coffee-shop@xxxx.com</p><p>Horario: De Lunes a Viernes: de 9:00 a 18:00h.</p>`);

// popup del Coffee-Shop (segura)
mimapa.on('load', function () {
    marcador.openOn(mimapa);
});

//circulo marcar zona - radio en metros
var circulo = L.circle([40.320930,-3.870172], { 
color: '#006b73', //color coffee-shop
fillColor: '#734200', //color coffee-shop
fillOpacity: 0.6, 
radius: 80
}).addTo(mimapa); 



//geolicalizacion usurio y calculo ruta
mimapa.locate({ 
setView: true, 
maxZoom: 16, 
watch: false 
});

//variables usuario de marca de posicion y circulo
var userMarker;
var userCircle;
var controlRuta = null;

mimapa.on('locationfound', function(e) {
var ubicacionUsuario = e.latlng;

// Limpiar marcadores y ruta anterior porque interfiere en el codigo y aparecen dos veces y no se ve popup 
if (userMarker) {
 mimapa.removeLayer(userMarker);
 mimapa.removeLayer(userCircle);
}
if (controlRuta) {
 mimapa.removeControl(controlRuta);
}

//marcador posicion del usuario
userMarker = L.marker(ubicacionUsuario)
.addTo(mimapa)
.bindPopup("¡Tu ubicación actual!"); // Solo se abre al hacer CLICK

// Círculo del usuario.
userCircle = L.circle(ubicacionUsuario, {
color: 'blue',
fillColor: '#0c0539ff',
fillOpacity: 0.5,
radius: e.accuracy /20
}).addTo(mimapa);

//control de la ruta de geolocalizacion al usuario
controlRuta = L.Routing.control({ 
waypoints: [
ubicacionUsuario, 
destinoLatLng 
],
routeWhileDragging: false, 
language: 'es', 
show: true,  
collapsible: false,

//funcion crear marcadores
    createMarker: function() { return null; } 
}).addTo(mimapa);
});


// error de la geolocalizacion para avisar al usuario
mimapa.on('locationerror', function(e) {

alert("No se pudo obtener tu ubicación para calcular la ruta: " + e.message + 
 "\nPor favor, asegúrate de aceptar los permisos de geolocalización para poder mostrarte la ruta.");
    
// Si falla la geolocalización, abrimos el popup del Coffee-Shop como referencia
    marcador.openOn(mimapa); 
});

//posicion al hacer click en el mapa
mimapa.on("click", function(e) { 
var pixelPosition = e.layerPoint; 
var latLng = e.latlng;
alert("Position Pixel = " + pixelPosition + "\n LatLng = " + latLng);
});