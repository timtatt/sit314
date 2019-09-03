module.exports = (err, res) => {
	if (err) {
		res.send({
			status: 'error',
			message: err,
		});
		return false;
	}
	return true;
}