const key = 'pk.eyJ1IjoiYXZyZW1pZ3VlIiwiYSI6ImNrN2UyaGdyZzA0NmozZ250bGNyMHMyaXYifQ.mxEBxZOBHLkzJGPJllpVEg';

let canvas;
let polygons = [];
const mappa = new Mappa('MapboxGL', key);
let trainMap;



const options = {
  lat: 0,
  lng: 0,
  zoom: 4,
  style: 'mapbox://styles/mapbox/traffic-night-v2',
  //pitch: 50,
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
/*
	//print(polygons);

	for(var i = 0; i <polygons.length; i++){
		for(var j = 0; j <polygons[i].length; j++){
			beginShape();
      fill("red");
			var pos = trainMap.latLngToPixel(polygons[i][j][0], polygons[i][j][1]);
      ellipse(pos.x, pos.y, 100, 100);
			endShape();
		}
	}*/
	console.log(polygons);

	let nigeria = trainMap.latLngToPixel(11.396396, 5.076543);
	console.log(nigeria);


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