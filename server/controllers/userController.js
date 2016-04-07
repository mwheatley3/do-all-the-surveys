var UserController = {};

var models = require('../models/index.js');

UserController.createUser = function(req, res) {
	models.User.create()
	.then(function(resp) {
		res.send(resp);
	})
};

module.exports = UserController;