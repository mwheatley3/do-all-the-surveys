var UserController = {};

var models = require('../models/index.js');

UserController.findOrCreateUser = function(req, res) {
	var userId = req.body.userId;
	console.log('user id in find or create', userId);
	models.User.findOrCreate({
		where: {
			id: userId
		}
	})
	.then(function(resp) {
		console.log('!!!!!!!!!!!!!!!!!!!!!!find or create', resp);
		res.send(resp);
	})
};

module.exports = UserController;