let data;

function preload() {
	const url = "https://api.apify.com/v2/key-value-stores/vpfkeiYLXPIDIea2T/records/LATEST"
	data = loadJSON(url);
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	noLoop();
}

function draw() {
	print(data);
	let count = 20;

	Object.entries(data.State).map( (s) => {
		let [estado, datos] = s;
		if(datos.infected <= 10000) fill("green");
		else if(datos.infected > 15000 && datos.infected <20000) fill("orange");
		else fill("red");
		text(`${estado}: ${datos.infected} infectados`, 100, count);
		count += 20;
		console.log(datos.infected); 

	});
}