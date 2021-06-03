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
	background("black");
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
		
		map.addLayer({
			'id': 'state-fills',
			'type': 'fill',
			'source': 'states',
			'layout': {},
			'paint': {
				'fill-color': '#E52C04',
				'fill-opacity': [
					'case',
					['boolean', ['feature-state', 'hover'], false], 1, 0.5]
			}
		});
		 
		map.addLayer({
			'id': 'state-borders',
			'type': 'line',
			'source': 'states',
			'layout': {},
			'paint': {
				'line-color': '#E52C04',
				'line-width': 2
			}
		});
		

		map.on('mousemove', 'state-fills', function (e) {
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
		 
		map.on('mouseleave', 'state-fills', function () {
			if (hoveredStateId !== null) {
	    	popup.remove();
				map.setFeatureState(
					{ source: 'states', id: hoveredStateId },
					{ hover: false }
				);
			}
			hoveredStateId = null;
		});
	});
}