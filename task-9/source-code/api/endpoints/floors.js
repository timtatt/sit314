const Floor = require('./../models/floor.js');

const handleError = require('./../helpers/handle-error.js');

module.exports = app => {
	app.get('/floor', (req, res) => {
		Floor.find().exec((err, docs) => {
			if (handleError(err, res)) {
				res.send({
					floors: docs,
					status: 'success',
				});
			}
		});
	});

	app.post('/floor', (req, res) => {
		var floor = new Floor(req.body);

		floor.save(err => {
			if (handleError(err, res)) {
				res.send({
					floor: floor,
					status: 'success',
				});
			}
		});
	});

	app.get('/floor/:floorId', (req, res) => {
		Floor.findById(req.params.floorId).exec((err, docs) => {
			if (handleError(err, res)) {
				res.send(docs);
			}
		});
	});

	app.put('/floor/:floorId', (req, res) => {
		Floor.updateOne({
			_id: req.params.floorId,
		}, req.body, (err, res) => {
			if (handleError(err, res)) {
				res.send({
					status: 'success',
				});
			}
		});
	});

	app.delete('/floor/:floorId', (req, res) => {
		Floor.deleteOne({
			_id: req.params.floorId,
		}, err => {
			if (handleError(err, res)) {
				res.send({
					status: 'success',
				});
			}
		});
	});
};