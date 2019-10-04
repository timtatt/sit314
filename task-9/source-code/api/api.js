const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const _ = require('underscore');
const fileUpload = require('express-fileupload');

const app = express();
const mqtt = require('./mqtt.js');
const port = 3000;

const mongoose = require('mongoose');

const apiKeys = {
	'9af4d8381781baccb0f915e554f8798d': {
		origins: ['http://localhost:4200'],
	},
};

mqtt();
app.use(cors());
app.use(mongoSanitize());
app.use(helmet());
app.use(bodyParser.json());
app.use(fileUpload({
	useTempFiles: true,
	safeFileNames: true,
	createParentPath: true,
	preserveExtension: true,
	tempFileDir: '/tmp/',
}));

app.use((req, res, next) => {
	if (!req.header('apiKey')) {
		res.status(401);
		res.send({
			status: 'error',
			message: 'apiKey is required to make requests',
		});
	} else if (!apiKeys[req.header('apiKey')]) {
		res.status(401);
		res.send({
			status: 'error',
			message: 'Not a valid apiKey',
		});
	} else {
		var apiKey = apiKeys[req.header('apiKey')];
		if (!_.contains(apiKey.origins, req.headers.origin)) {
			res.status(401);
			res.send({
				status: 'error',
				message: 'Not a valid apiKey for this origin',
			});
		} else {
			next();
		}
	}
});

app.use('/uploads', express.static(__dirname + '/uploads'));

mongoose.connect('mongodb://localhost:27017/sit314-project', {
	useNewUrlParser: true
});

require('./endpoints/buildings.js')(app);
require('./endpoints/floors.js')(app);
require('./endpoints/devices.js')(app);
require('./endpoints/rooms.js')(app);
require('./endpoints/auth.js')(app);

app.listen(port, () => {
	console.log(`API running on port ${port}`);
});