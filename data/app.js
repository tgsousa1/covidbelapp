// Iniciar leaflet.js
var L = require('leaflet');

// Iniciar o mapa
var map = L.map('map', {
  scrollWheelZoom: true
});

// Posição e zoom inicial
map.setView([-1.32650735, -48.44244689], 11);

/*	Basemap */
var osm_mapnik = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; OSM Mapnik <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, CNES - DataSus, Mappea'
}).addTo(map);

/* Dados */

// icones
var orangeC = L.icon({
    iconUrl: 'img/circulo-orange.png',
    iconSize: [13,13]
});

var blueC = L.icon ({
    iconUrl: 'img/circulo-blue.png',
    iconSize: [13,13]
});

var hospIcon = L.icon ({
    iconUrl: 'img/hospital.png',
    iconSize: [16,15]
});

var poliC = L.icon({
    iconUrl: 'img/polic.png',
    iconSize: [15,15]
})

//postos de atendimento

$.getJSON("hospitais.geojson",function(data){
    L.geoJson(data,{
        pointToLayer: function (feature, latlng){
            return L.marker(latlng, {icon: hospIcon})
        },
        onEachFeature: function(feature,layer){
            layer.bindPopup("<strong>"+feature.properties.Name+"</strong><br/> Tipo de Atendimento: " + feature.properties.SITUACAO + "<br/>Você poderá ser direcionado à este local em caso de sintomas graves.")
        }
    }).addTo(map);
    });

$.getJSON("policlinica.geojson",function(data){
    L.geoJson(data,{
        pointToLayer: function (feature, latlng){
            return L.marker(latlng, {icon: poliC})
        },
        onEachFeature: function(feature,layer){
            layer.bindPopup("<strong>"+feature.properties.Name+"</strong><br/> Tipo de Atendimento: " + feature.properties.SITUACAO + "<br/>Você deve ir à este local em caso de sintomas leves. A Policlinica <strong> NÃO FAZ TESTAGEM.</strong>")
        }
    }).addTo(map);
    });

$.getJSON("UPA.geojson",function(data){
    L.geoJson(data,{
        pointToLayer: function (feature, latlng){
            return L.marker(latlng, {icon: orangeC})
        },
        onEachFeature: function(feature,layer){
            layer.bindPopup("<strong>"+feature.properties.Name+"</strong><br/> Tipo de Atendimento: " + feature.properties.SITUACAO + "<br/>Você poderá ser direcionado à este local em caso de sintomas graves.")
        }
    }).addTo(map);
    }); 

$.getJSON("UBS.geojson",function(data){
    L.geoJson(data,{
        pointToLayer: function (feature, latlng){
            return L.marker(latlng, {icon: blueC})
        },
        onEachFeature: function(feature,layer){
            layer.bindPopup("<strong>"+feature.properties.Name+"</strong><br/> Tipo de Atendimento: " + feature.properties.SITUACAO+ "<br/>Você deve ir à este local em caso de sintomas leves. As UBS <strong> NÃO FAZEM TESTAGEM.</strong>")
        }
    }).addTo(map);
    });


// acessibilidade

$.getJSON("acessibilidade.geojson", function(acessData){
    L.geoJSON(acessData, {
        style: function(feature){
            var fillColor,
                tempo = feature.properties.AA_MINS;
            if (tempo == 5) fillColor = "#ffffcc";
            else if (tempo == 10) fillColor = "#41b6c4";
            else if (tempo == 15) fillColor = "#253494";
            return {color:"#999",weight:0.02, fillColor: fillColor, fillOpacity: 0.4};
        },
        onEachFeature:function(feature, layer){
            layer.bindPopup("A partir dessa área, em aproximadamente " + "<strong>" + feature.properties.Name + "</strong>" + "<br/> é possível chegar a posto de atendimento, de carro.")
        }
    }).addTo(map);
});

