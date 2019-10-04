const {Switch, Light} = require('./../models/devices.js');

const handleError = require('./../helpers/handle-error.js');

module.exports = app => {
	app.get('/device', (req, res) => {
		queries.push(Switch.find(params).exec((err, switches) => {
			handleError(err, res);
		}));

		queries.push(Light.find(params).exec((err, lights) => {
			handleError(err, res);
		}));

		Promise.all(queries).then(docs => {
			res.send({
				switches: docs[0],
				lights: docs[1],
			});
		});
	});

	app.get('/device/:type', (req, res) => {
		switch (req.params.type) {
			case 'switch':
				var device = new Switch(req.body);
				break;
			case 'light':
				var device = new Light(req.body);
				break;
		}

		device.find().exec((err, devices) => {
			if (handleError(err, res)) {
				res.send(devices);
			}
		});
	});

	app.post('/device/:type', (req, res) => {
		switch (req.params.type) {
			case 'switch':
				var device = new Switch(req.body);
				break;
			case 'light':
				var device = new Light(req.body);
				break;
		}

		device.save(err => {
			if (handleError(err, res)) {
				res.send({
					device: device,
					status: 'success',
				});
			}
		});
	});

	app.get('/device/:type/:deviceId', (req, res) => {
		switch (req.params.type) {
			case 'switch':
				var device = Switch;
				break;
			case 'light':
				var device = Light;
				break;
		}		

		device.findById(req.params.deviceId).exec((err, docs) => {
			if (handleError(err, res)) {
				res.send(docs);
			}
		});
	});

	app.put('/device/:type/:deviceId', (req, res) => {
		switch (req.params.type) {
			case 'switch':
				var device = Switch;
				break;
			case 'light':
				var device = Light;
				break;
		}	

		device.updateOne({
			_id: req.params.deviceId,
		}, req.body, (err, doc) => {
			if (handleError(err, res)) {
				res.send({
					status: 'success',
				});
			}
		});
	});

	app.delete('/device/:type/:deviceId', (req, res) => {
		switch (req.params.type) {
			case 'switch':
				var device = Switch;
				break;
			case 'light':
				var device = Light;
				break;
			default:
				handleError("Invalid device type", res);
		}	

		device.deleteOne({
			_id: req.params.deviceId,
		}, err => {
			if (handleError(err, res)) {
				res.send({
					status: 'success',
				});
			}
		});
	});
};