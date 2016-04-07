var AdminController = require('../controllers/adminController.js');
var QuestionController = require('../controllers/questionController.js');
module.exports = function(app){
	app.post('/question', QuestionController.saveQuestion);
	app.get('/response', AdminController.getResponses);
}