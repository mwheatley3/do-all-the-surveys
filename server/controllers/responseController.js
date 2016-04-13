var ResponseController = {};

var models = require('../models/index.js');

ResponseController.respond = function(req, res) {
	var userId = req.body.userId;
	var questionId = req.body.questionId;
	var answerId = req.body.answerId;
	models.Response.create({user_id: userId, question_id: questionId, answer_id: answerId})
	.then(function(resp) {
		res.send(resp);
	});
};

module.exports = ResponseController;
