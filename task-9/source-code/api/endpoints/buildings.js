const Building = require('./../models/building.js');
const Floor = require('./../models/floor.js');

const _ = require('underscore');

const handleError = require('./../helpers/handle-error.js');

module.exports = app => {
	app.get('/building', (req, res) => {
		Building.find().lean().exec((err, docs) => {
			var queries = [];
			_.each(docs, building => {
				queries.push(Floor.countDocuments({
					buildingId: building._id
				}).then(num => {
					building.floorNum = num;
				}));
			});

			Promise.all(queries).then(() => {
				if (handleError(err, res)) {
					res.send({
						buildings: docs,
						status: 'success',
					});
				}
			});
		});
	});

	app.post('/building', (req, res) => {
		var building = new Building(req.body);

		building.save(err => {
			if (handleError(err, res)) {
				res.send({
					building: building,
					status: 'success',
				});
			}
		});
	});

	app.get('/building/:buildingId', (req, res) => {
		Building.findById(req.params.buildingId).exec((err, docs) => {
			if (handleError(err, res)) {
				res.send({
					building: docs,
					status: 'success',
				});
			}
		});
	});

	app.put('/building/:buildingId', (req, res) => {
		Building.updateOne({
			_id: req.params.buildingId,
		}, req.body, (err, doc) => {
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
		}).sort({
			floorOrder: 'asc',
		}).exec((err, docs) => {
			if (handleError(err, res)) {
				res.send({
					floors: docs,
					status: 'success',
				});
			}
		});
	});

	app.post('/building/:buildingId/floors/reorder', (req, res) => {
		var queries = [];
		for (var floor of req.body) {
			queries.push({
				updateOne: {
					filter: {
						_id: floor._id,
					}, 
					update: {
						floorOrder: floor.order,
					}
				}
			});
		}

		Floor.bulkWrite(queries, doc => {
			res.send({
				status: 'success',
			});
		});
	});
};