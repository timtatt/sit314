module.exports = app => {
	app.post('/auth', (req, res) => {
		if (req.body.password == 'admin') {
			res.send({
				authenticated: true,
			});
			return;
		}
		res.send({
			authenticated: false,
		});	
	});
}