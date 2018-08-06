module.exports = {
	read: function (req, res) {
		res.setHeader('Content-Type', 'application/json');
		let error = {
			"errors": [
				{
					"userMessage": "Not found – There is no resource behind the URI",
					"internalMessage": "you don't pay the plumber for banging on the pipes. you pay him for knowing where to bang!",
					"code": 404,
					"more info": "http://localhost/gmaps/ind.html"
				}
			]

		}
		res.status(404)
		res.send(JSON.stringify(error));
	}
}