module.exports = (err, res) => {
	if (err) {
		res.status(500);
		res.send({
			status: 'error',
			message: err,
		});
		return false;
	}
	return true;
}