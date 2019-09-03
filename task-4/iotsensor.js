const mongoose = require('mongoose');
const plotly = require('plotly')('timtatt', 'YgTqcFjrr4RB28HeCLBz');

const Sensor = require('./models/sensor');

const tempHigh = 40;
const tempLow = 10;


const sensorData = {
	id: 0,
	name: "Temp Sensor",
	address: "221 Burwood Hwy, Burwood VIC 3125",
	time: Date.now(),
	temp: 20,
};

var plotData = {
	x: [],
	y: [],
	type: 'scatter',
};
var lastTime = Date.now();

setInterval(() => {
	console.log('saved');
	mongoose.connect('mongodb://localhost:27017/sit314', {
		useNewUrlParser: true
	});

	var tempReading = Math.floor(Math.random() * (tempHigh - tempLow) + tempLow);
	sensorData.temp = tempReading;
	sensorData.time = Date.now();

	const sensor = new Sensor(sensorData);
	sensor.save().then(doc => {
		console.log(doc);
	}).then(() => {
		plotData.x.push((new Date()).toISOString());
		plotData.y.push(sensorData.time - lastTime);
		lastTime = sensorData.time;

		var graphOptions = {
			filename: "iot-performance", 
			fileopt: "overwrite"
		};

		plotly.plot(plotData, graphOptions, function (err, msg) {
			if (err) return console.log(err);
			console.log(msg);
		});

		mongoose.connection.close();
	});

}, 3000);