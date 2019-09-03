const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
	var calc = 0;
	for (var i = 0; i < 10000; i++) {
		calc += Math.random() * Math.random();
	}
	console.log(calc);
	res.send(calc.toFixed(10));
});

app.listen(port, () => {
	console.log(`listening to port ${port}`);
});