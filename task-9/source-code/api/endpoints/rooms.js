const Room = require('./../models/room.js');
const {Switch, Light} = require('./../models/devices.js');

const handleError = require('./../helpers/handle-error.js');

module.exports = app => {
	app.get('/room', (req, res) => {
		Room.find().exec((err, docs) => {
			if (handleError(err, res)) {
				res.send(docs);
			}
		});
	});

	app.post('/room', (req, res) => {
		var room = new Room(req.body);

		room.save(err => {
			if (handleError(err, res)) {
				res.send({
					room: room,
					status: 'success',
				});
			}
		});
	});

	app.get('/room/:roomId', (req, res) => {
		Room.findById(req.params.roomId).exec((err, docs) => {
			if (handleError(err, res)) {
				res.send(docs);
			}
		});
	});

	app.put('/room/:roomId', (req, res) => {
		Room.updateOne({
			_id: req.params.roomId,
		}, req.body, (err, doc) => {
			if (handleError(err, res)) {
				res.send({
					status: 'success',
				});
			}
		});
	});

	app.delete('/room/:roomId', (req, res) => {
		Room.deleteOne({
			_id: req.params.roomId,
		}, err => {
			if (handleError(err, res)) {
				res.send({
					status: 'success',
				});
			}
		});
	});

	app.get('/room/:roomId/devices', (req, res) => {
		var params = {
			roomId: req.params.roomId
		};

		var queries = [];

		queries.push(Switch.find(params).exec((err, switches) => {
			handleError(err, res);
		}));

		queries.push(Light.find(params).exec((err, lights) => {
			handleError(err, res);
		}));

		Promise.all(queries).then(docs => {
			res.send({
				status: 'success',
				devices: {
					switches: docs[0],
					lights: docs[1],
				}
			});
		});
	});
};