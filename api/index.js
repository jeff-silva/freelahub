const app = require('express')();
module.exports = { path: '/api', handler: app };


app.get('/say/:word', (req, res) => {
	res.json(req.params);
});