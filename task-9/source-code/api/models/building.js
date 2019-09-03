const mongoose = require('mongoose');

module.exports = mongoose.model('Building', new mongoose.Schema({
	name: String,
}));