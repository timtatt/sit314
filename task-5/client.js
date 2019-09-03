const http = require('http');

setInterval(loadTest, 100);

function loadTest() {
	http.get('http://ec2-18-233-154-212.compute-1.amazonaws.com:3000', (res) => {
		res.on('data', function(chunk) {
			console.log('' + chunk);
		});
	});
}