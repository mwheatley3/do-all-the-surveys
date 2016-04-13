var QuestionController = {};

var models = require('../models/index.js');

QuestionController.saveQuestion = function(req, res) {

	var questionText = req.body.question;
	var answers = req.body.answers;

	models.Question.create({question_text: questionText})
	.then(function(resp) {
		return resp.dataValues.id;
	})
	.then(function(question_id) {
		answers.forEach(function(answer) {
			models.Answer.create({
				answer_text: answer.answerText,
				question_id: question_id
			});
		});
	})
	.then(function() {
		res.sendStatus(200);
	});
};

QuestionController.getQuestion = function(req, res){
	var user_id = req.query.user_id;
	models.Question.findOne({
		where: {'id':{
			$notIn: models.sequelize.literal('(select question_id from responses, answers' + 
				' where responses.answer_id = answers.id and user_id = ' + user_id + ')')
		}},
		include:[{model: models.Answer
		}]
	})
	.then(function(resp) {
		res.send(resp);
	})
	
}

module.exports = QuestionController;