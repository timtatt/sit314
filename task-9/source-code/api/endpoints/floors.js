const Room = require('./../models/room.js');
const Floor = require('./../models/floor.js');
const fs = require('fs');

const handleError = require('./../helpers/handle-error.js');

module.exports = app => {
	app.get('/floor', (req, res) => {
		Floor.find().sort({
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
	
	app.post('/floor/:floorId/floorplan', (req, res) => {
		if (!req.files || Object.keys(req.files).length === 0) {
			handleError("No files were uploaded", res);
		}

		let floorplan = req.files.floorplan;

		// Create directory for floor
		var floorplanUrl = `/uploads/${req.params.floorId}/${floorplan.name}`;
		floorplan.mv(`.${floorplanUrl}`, err => {
			if (handleError(err, res)) {
				Floor.updateOne({
					_id: req.params.floorId,
				}, {
					floorplanUrl: `http://localhost:3000${floorplanUrl}`,
				}, (err, doc) => {
					console.log(doc);
					if (handleError(err, res)) {
						res.send({
							floorplanUrl: doc.floorplanUrl,
							status: 'success',
						});
					}
				});
			}
		});
	});

	app.post('/floor/:floorId/reorder', (req, res) => {
		Floor.updateOne({
			_id: req.params.floorId,
		}, {
			floorOrder: req.body.order,
		}, (err, doc) => {
			if (handleError(err, res)) {
				res.send({
					status: 'success',
				});
			}
		});
	});

	app.put('/floor/:floorId', (req, res) => {
		Floor.updateOne({
			_id: req.params.floorId,
		}, req.body, (err, doc) => {
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

	app.get('/floor/:floorId/rooms', (req, res) => {
		Room.find({
			floorId: req.params.floorId
		}).exec((err, docs) => {
			if (handleError(err, res)) {
				res.send({
					rooms: docs,
					status: 'success',
				});
			}
		});
	});
};