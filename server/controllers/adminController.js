var AdminController = {};

var models = require('../models/index.js');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jwt-simple');
AdminController.getResponses = function(req, res) {
	var responses = [];
	models.Question.findAll({
		include:[{model: models.Answer,
			include:[{
				model: models.Response
			}]
		}]
	})
	.then(function(resp) {
		resp.forEach(function(q) {
			responses.push({
				question_id: q.dataValues.id,
				question_text: q.dataValues.question_text,
				answers: q.dataValues.Answers.map(function(a) {
					return {
						answer_id: a.dataValues.id,
						answer_text: a.dataValues.answer_text,
						count: a.dataValues.Responses.length
					};
				})
			});
		});
		res.send({responses: responses});
	});
};

AdminController.login = function(req, res) {
	var username = req.body.username;
	var password = req.body.password;
	models.Admin.findOne({
		where: {
			'username': username
		}
	})
	.then(function(resp) {
		if (!resp) {
			res.send({'error': 'user does not exist'});
		}
		var storedPassword = resp.dataValues.password;
		if (bcrypt.compareSync(password, storedPassword)) {
			var token = jwt.encode;
			res.send({token: token});
		} else {
			res.send({error: 'incorrect password'});
		}
	})
	.catch(function(resp) {
		res.send({error: resp});
	});
};

AdminController.createAdmin = function(req, res) {
	var username = req.body.username;
	var password = bcrypt.hashSync( req.body.password, bcrypt.genSaltSync(10) );
	models.Admin.create({
		username: username,
		password: password
	})
	.then(function(resp) {
		res.sendStatus(200);
	})
	.catch(function(err) {
		res.send({error: resp});
	});
};
//seed database with 123 user
var seedPassword = bcrypt.hashSync( '123', bcrypt.genSaltSync(10) );
models.Admin.upsert({
	username: '123',
	password: seedPassword
});

module.exports = AdminController;
