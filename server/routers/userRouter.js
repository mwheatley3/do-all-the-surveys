var AdminController = require('../controllers/adminController.js');
var QuestionController = require('../controllers/questionController.js');
var UserController = require('../controllers/userController.js');
var ResponseController = require('../controllers/responseController.js');
module.exports = function(app){
	app.get('/question', QuestionController.getQuestion);
	app.post('/create', UserController.createUser);
	app.post('/respond', ResponseController.respond);
}