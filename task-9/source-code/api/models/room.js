const mongoose = require('mongoose');

module.exports = mongoose.model('Room', new mongoose.Schema({
	name: String,
	floor: mongoose.Schema.Types.ObjectId,
	bounds: Object[],
}));