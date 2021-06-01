const key = 'pk.eyJ1GV9Jm2u7rmsCe65wKzPTw5jtS38n2tVEGiQ2emhyMWU4NTJvbzFuaXcyajNjeCJ9.G6rwyJrwlzbVxwQPdFiLvw';

let canvas;
let polygons = [];
const mappa = new Mappa('MapboxGL', key);
let trainMap;



const options = {
  lat: 11,
  lng: 11,
  zoom: 8.5,
  studio: true,
  style: 'mapbox://styles/mapbox/traffic-night-v2',
};


function preload() {
	const url = "https://api.apify.com/v2/key-value-stores/vpfkeiYLXPIDIea2T/records/LATEST"
	const url2 = "assets/JSONS/states.json"
	data = loadJSON(url);
	polygonsData = loadJSON(url2);
}

function setup() {
	canvas = createCanvas(800, 600);
  trainMap = mappa.tileMap(options);
  trainMap.overlay(canvas);
 // console.log(polygonsData);
  noLoop();

}

function draw() {
	clear();

	Object.entries(polygonsData.features).map( (s) => {
		let [features, dato2] = s;
		var array = [];
		for(var i = 0; i <dato2.geometry.coordinates[0][0].length; i++){
			array.push(dato2.geometry.coordinates[0][0][i]);
		}
		polygons.push(array);
	});

	//print(polygons);

	for(var i = 0; i <polygons.length; i++){
		for(var j = 0; j <polygons[i].length; j++){
			beginShape();
      fill("red");
			var pos = trainMap.latLngToPixel(polygons[i][j][0], polygons[i][j][1]);
      ellipse(pos.x, pos.y, 100, 100);
			endShape();
		}
	}

	/*print(data);
	let count = 20;
	Object.entries(data.State).map( (s) => {
		let [estado, datos] = s;
		if(datos.infected <= 10000) fill("green");
		else if(datos.infected > 15000 && datos.infected <20000) fill("orange");
		else fill("red");
		text(`${estado}: ${datos.infected} infectados`, 100, count);
		count += 20;
		console.log(datos.infected); 

	});*/
}