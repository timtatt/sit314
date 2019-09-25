const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;
const fileUpload = require('express-fileupload');

const mongoose = require('mongoose');

app.use(cors());
app.use(bodyParser.json());

app.use(fileUpload({
	useTempFiles: true,
	safeFileNames: true,
	createParentPath: true,
	preserveExtension: true,
	tempFileDir: '/tmp/',
}));

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