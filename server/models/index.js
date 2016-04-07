

var db        = {};
var Sequelize = require('sequelize');
var sequelize = new Sequelize('sumo', 'root', '');

db.Question = sequelize.import('./question.js');
db.Answer   = sequelize.import('./answer.js');
db.User     = sequelize.import('./user.js');
db.Response = sequelize.import('./response.js');


Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
  	console.log('modelName', modelName);
    db[modelName].associate(db);
  }
});

Object.keys(db).forEach(function(modelName){
  db[modelName].sync().then(function() {
    console.log('created table:', modelName);
  })
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;