const mongoose = require('mongoose');

module.exports = mongoose.model('Room', new mongoose.Schema({
	name: String,
	floorId: mongoose.Schema.Types.ObjectId,
	vertices: [Object],
	edges: [Object],
}));