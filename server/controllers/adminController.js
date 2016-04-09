var AdminController = {};

var models = require('../models/index.js');

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
		console.log('!!!!!!!!!!!!!!!', resp);
		console.log('responses', responses);
		console.log('responses[1]', responses[1].answers);
		console.log('responses[2]', responses[2].answers);
		res.send({responses: responses});
	})




	// var responses = [];
	// models.Question.findAll()
	// .then(function(resp){
	// 	resp.forEach(function(q){
	// 		responses.push({
	// 			question_text: q.dataValues.question_text,
	// 			question_id: q.dataValues.quesiton_id
	// 		});
	// 	})
	// 	return resp;
	// })
	// .then(function(resp){
	// 	models.Answer.findAll()
	// })
	// models.Response.findAndCountAll({
	// 	attributes: ['answer_id',
	// 		models.sequelize.fn('count', models.sequelize.col('answer_id'))],
	// 		group: ['answer_id']
	// 	}
	// )
	// .then(function(resp) {
	// 	console.log('resp', resp);
	// 	res.send(resp);
	// })
};

// QuestionController.getQuestion = function(req, res){
// 	var user_id = req.query.user_id;
// 	console.log('user_id', user_id);
// 	models.Question.findOne({include:[models.Answer]})
// 	.then(function(resp) {
// 		console.log('q/a resp', resp);
// 		res.send(resp);
// 	})
// }

module.exports = AdminController;


 // Table.findAll({
 //   attributes: ['column1', 
 //     sequelize.fn('count', sequelize.col('column2'))], 
 //   group: ["Table.column1"]
 // }).then(function (result) { });