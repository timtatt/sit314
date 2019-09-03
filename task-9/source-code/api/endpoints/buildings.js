const Building = require('./../models/building.js');
const Floor = require('./../models/floor.js');

const handleError = require('./../helpers/handle-error.js');

module.exports = app => {
	app.get('/building', (req, res) => {
		Building.find().exec((err, docs) => {
			if (handleError(err, res)) {
				res.send(docs);
			}
		});
	});

	app.post('/building', (req, res) => {
		var building = new Building(req.body);

		building.save(err => {
			if (handleError(err, res)) {
				res.send({
					status: 'success',
				});
			}
		});
	});

	app.get('/building/:buildingId', (req, res) => {
		Building.findById(req.params.buildingId).exec((err, docs) => {
			if (handleError(err, res)) {
				res.send(docs);
			}
		});
	});

	app.put('/building/:buildingId', (req, res) => {
		Building.updateOne({
			_id: req.params.buildingId,
		}, req.body, (err, res) => {
			if (handleError(err, res)) {
				res.send({
					status: 'success',
				});
			}
		});
	});

	app.delete('/building/:buildingId', (req, res) => {
		Building.deleteOne({
			_id: req.params.buildingId,
		}, err => {
			if (handleError(err, res)) {
				res.send({
					status: 'success',
				});
			}
		});
	});

	app.get('/building/:buildingId/floors', (req, res) => {
		Floor.find({
			buildingId: req.params.buildingId
		}).exec((err, docs) => {
			if (handleError(err, res)) {
				res.send(docs);
			}
		});
	});
};