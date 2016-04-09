var Path = require('path');

var db        = {};
var Sequelize = require('sequelize');
var env       = process.env.NODE_ENV || "development";
var config    = require(Path.join(__dirname, '../..', 'config', 'config.json'))[env];
// var sequelize = new Sequelize(config.database, config.username, config.password);
var sequelize = new Sequelize(process.env.CLEARDB_DATABASE_URL);


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