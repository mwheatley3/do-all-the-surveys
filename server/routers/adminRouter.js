var AdminController = require('../controllers/adminController.js');
var QuestionController = require('../controllers/questionController.js');
module.exports = function(app){
	app.post('/login', AdminController.login);
	app.post('/question', QuestionController.saveQuestion);
	app.post('/create', AdminController.createAdmin);
	app.get('/response', AdminController.getResponses);
}