var UserController = {};

var models = require('../models/index.js');

UserController.findOrCreateUser = function(req, res) {
	var userId = req.body.userId;
	models.User.findOrCreate({
		where: {
			id: userId
		}
	})
	.then(function(resp) {
		res.send(resp);
	});
};

module.exports = UserController;
