const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

const mongoose = require('mongoose');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/sit314-project', {
	useNewUrlParser: true
});

// const Building = require('./models/building.js');
// const {Light, Switch} = require('./models/devices.js');
require('./endpoints/buildings.js')(app);
require('./endpoints/floors.js')(app);
require('./endpoints/devices.js')(app);
require('./endpoints/rooms.js')(app);
require('./endpoints/auth.js')(app);

app.listen(port, () => {
	console.log(`API running on port ${port}`);
});