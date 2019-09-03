const plotly = require('plotly')('timtatt', 'YgTqcFjrr4RB28HeCLBz');
const mqtt = require('mqtt');

const mqttConfig = {
	url: '',
	username: '',
	password: '',
};

const graphOptions = {
	filename: 'light-levels', 
	fileopt: 'overwrite',
};

var plotData = {
	x: [],
	y: [],
	type: 'scatter',
};

var mqttClient = mqtt.connect(mqttConfig.url, {mqttConfig.username, mqttConfig.password});

client.on('connect', () => {
	console.log('Connected to MQTT');

	client.subscribe('/data/light');
});

client.on('message', (topic, message) => {
	switch (topic) {
		case '/data/light':
			console.log('Received light reading');
			var data = JSON.parse(message);
			
			plotData.x.push((new Date()).toISOString());
			plotData.y.push(data.level);

			

			plotly.plot(plotData, graphOptions, function (error, msg) {
				if (error) {
					console.log('A fucking error occurred!');
					return console.log(error);
				}

				console.log('Light reading pushed to plotly');
				console.log(msg);
			});
			break;
	}
});