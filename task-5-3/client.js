const request = require('request');

const sensors = [
	{
		sensorId: 'sensor-1',
		temp: 5,
	},
	{
		sensorId: 'sensor-2',
		temp: 10,
	},
	{
		sensorId: 'sensor-3',
		temp: 20,
	},
];

setInterval(function() {
	for (var sensorIndex in sensors) {
		var sensor = sensors[sensorIndex];
		sensor.temp = randomTemp(sensor.temp);
		request({
			url: `http://54.147.36.100:3000/sensors/temp`,
			json: true,
			body: {
				sensorId: sensor.sensorId,
				temp: sensor.temp,
			},
			method: 'post',
		});
	}
}, 1000);

function randomTemp(currentTemp) {
	var randomInterval = Math.random();
	var randomInterval = Math.random() > 0.5 ? -randomInterval : randomInterval;
	return currentTemp + randomInterval;
}