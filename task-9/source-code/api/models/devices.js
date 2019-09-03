const mongoose = require('mongoose');

function DeviceSchema(additional) {
	var schema = new mongoose.Schema({
		modelNumber: String,
		name: String,
		room: mongoose.Schema.Types.ObjectId,
		floorCoordinates: Object,
	});

	if (additional) {
		schema.add(additional);
	}

	return schema;
}


const switchModel = mongoose.model('Switch', DeviceSchema({
	lights: [mongoose.Schema.Types.ObjectId]
}));

const lightModel = mongoose.model('Light', DeviceSchema({
	state: Boolean,
}));

module.exports.Switch = switchModel;
module.exports.Light = lightModel;
