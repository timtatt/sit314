const {Switch, Light} = require('./../models/devices.js');

const handleError = require('./../helpers/handle-error.js');

module.exports = app => {
	app.get('/device', (req, res) => {
		Switch.find().exec((err, switches) => {
			if (handleError(err, res)) {
				Light.find().exec((err, lights) => {
					if (handleError(err, res)) {
						res.send({lights, switches});
					}
				});
			}
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

		device.find().exec((err, switches) => {
			if (handleError(err, res)) {
				res.send(switches);
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