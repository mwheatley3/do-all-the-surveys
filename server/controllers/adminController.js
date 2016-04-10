var AdminController = {};

var models = require('../models/index.js');
var bcrypt = require('bcrypt-nodejs');

AdminController.getResponses = function(req, res) {
	var responses = [{
		question_id: 0,
		question_text: '',
		answers: [{
			answer_id: 0,
			answer_text: '',
			count: 0
		}]
	}];
	models.Question.findAll({
		include:[{model: models.Answer,
			include:[{
				model: models.Response
			}]
		}]
	})
	.then(function(resp){
		resp.forEach(function(q){
			responses.push({
				question_id: q.dataValues.id,
				question_text: q.dataValues.question_text,
				answers: q.dataValues.Answers.map(function(a){
					return {
						answer_id: a.dataValues.id,
						answer_text: a.dataValues.answer_text,
						count: a.dataValues.Responses.length
					};
				})
			})
		})
		res.send({responses: responses});
	})
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
		var storedPassword = resp.dataValues.password;
		if(bcrypt.compareSync(password, storedPassword)){
			res.send({username: username});
		} else {
			res.send({error: 'incorrect password'});
		}
	})
	.catch(function(resp) {
		console.log('login catch', resp);
	})
};

AdminController.createAdmin = function(req, res) {
	var username = req.body.username;
	var password = bcrypt.hashSync( req.body.password, bcrypt.genSaltSync(10) );
	models.Admin.create({
		username: username,
		password: password
	})
	.then(function(resp) {
		console.log('create admin', resp);
	})
};


module.exports = AdminController;


