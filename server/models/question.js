module.exports = function(sequelize, DataTypes) {
	var Question =  sequelize.define('Question', {
	  question_text: DataTypes.STRING
	}, {
		underscored: true,
		classMethods: {
      associate: function(models) {
        Question.hasMany(models.Answer)
      }
    }
	});

	return Question;
};
