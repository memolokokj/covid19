var map;
var infectados = {};

function preload() {
	const url = "https://api.apify.com/v2/key-value-stores/vpfkeiYLXPIDIea2T/records/LATEST"
	data = loadJSON(url);
}

function setup() {
	var canvas = createCanvas(windowWidth/2, windowHeight/2);

  mapboxgl.accessToken = 'pk.eyJ1IjoiYXZyZW1pZ3VlIiwiYSI6ImNrN2UyaGdyZzA0NmozZ250bGNyMHMyaXYifQ.mxEBxZOBHLkzJGPJllpVEg';
	map = new mapboxgl.Map({
		container: "map",
		style: 'mapbox://styles/mapbox/streets-v11',
		center: [-100.486052, 37.830348],
		zoom: 2
	});

	state();
	noLoop();
}

function draw() {
	Object.entries(data.State).map( (s) => {
		let [estado, datos] = s;
		infectados[estado] = datos.infected;
	});
	console.log(infectados); 
}

function state(){
	var hoveredStateId = null;
	 
	map.on('load', function () {
		// Create a popup, but don't add it to the map yet.
	  var popup = new mapboxgl.Popup({
	    closeButton: false,
	    closeOnClick: false
	  });

	  function checkEmpty(info) {
	    return (info) ? info : "No data";
	  }

		map.addSource('states', {
			'type': 'geojson',
			'data': 'assets/jsons/states.json'
		});
		
		for(i in infectados){

			var trueId = 0;
			var color = "#000000"
			
			switch(i){
				case "Queretaro":trueId=0;break;
				case "Ciudad de Mexico":trueId=1;break;
				case "Colima":trueId=2;break;
				case "Morelos":trueId=3;break;
				case "Aguascalientes":trueId=4;break;
				case "Chihuahua":trueId=5;break;
				case "Guanajuato":trueId=6;break;
				case "Coahuila":trueId=7;break;
				case "Nuevo Leon":trueId=8;break;
				case "Tamaulipas":trueId=9;break;
				case "Yucatan":trueId=10;break;
				case "Sinaloa":trueId=11;break;
				case "Quintana Roo":trueId=12;break;
				case "Durango":trueId=13;break;
				case "Hidalgo":trueId=14;break;
				case "Zacatecas":trueId=15;break;
				case "Campeche":trueId=16;break;
				case "San Luis Potosi":trueId=17;break;
				case "Jalisco":trueId=18;break;
				case "Veracruz":trueId=19;break;
				case "Puebla":trueId=20;break;
				case "Guerrero":trueId=21;break;
				case "Michoacan":trueId=22;break;
				case "Estado de Mexico":trueId=23;break;
				case "Tlaxcala":trueId=24;break;
				case "Oaxaca":trueId=25;break;
				case "Tabasco":trueId=26;break;
				case "Chiapas":trueId=27;break;
				case "Sonora":trueId=28;break;
				case "Baja California":trueId=29;break;
				case "Nayarit":trueId=30;break;
				case "Baja California Sur":trueId=31;break;
			}

			if(infectados[i] <= 10000) color = "#05F72F";
			else if(infectados[i] > 15000 && infectados[i] <20000) color = "#E0F903";
			else color = "#F60B07";
		
			map.addLayer({
				'id': 'state-fills'+trueId,
				'type': 'fill',
				'source': 'states',
				'layout': {},
				'paint': {
					'fill-color': color,
					'fill-opacity': [
						'case',
						['boolean', ['feature-state', 'hover'], false], 1, 0.5]
				},
				'filter': ['==', '$id', trueId]
			});
			 
			map.addLayer({
				'id': 'state-borders'+trueId,
				'type': 'line',
				'source': 'states',
				'layout': {},
				'paint': {
					'line-color': "#000000",
					'line-width': 1
				},
				'filter': ['==', '$id', trueId]
			});

			map.on('mousemove', 'state-fills'+trueId, function (e) {
				if (e.features.length > 0) {
					if (hoveredStateId !== null) {
						map.setFeatureState(
							{ source: 'states', id: hoveredStateId },
							{ hover: false }
						);
					}
					hoveredStateId = e.features[0].id;
					//console.log(e.features[0]);

			    // Show the popup at the coordinates with some data
			    popup.setLngLat(e.lngLat.wrap())
			      .setHTML(checkEmpty("<p style='text-align: center;'>"+e.features[0].properties.admin_name+"<br> Infectados: "+infectados[e.features[0].properties.admin_name]+"</p>"))
			      .addTo(map);

					map.setFeatureState(
						{ source: 'states', id: hoveredStateId },
						{ hover: true },
					);
				}
			});
			 
			map.on('mouseleave', 'state-fills'+trueId, function () {
				if (hoveredStateId !== null) {
		    	popup.remove();
					map.setFeatureState(
						{ source: 'states', id: hoveredStateId },
						{ hover: false }
					);
				}
				hoveredStateId = null;
			});

		}
	});
}