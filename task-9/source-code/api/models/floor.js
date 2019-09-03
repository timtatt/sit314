const mongoose = require('mongoose');

module.exports = mongoose.model('Floor', new mongoose.Schema({
	floorplanUrl: String,
	roomMapping: [Object],
	buildingId: mongoose.Schema.Types.ObjectId,
	name: String,
}));