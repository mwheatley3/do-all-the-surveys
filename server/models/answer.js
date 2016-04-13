module.exports = function(sequelize, DataTypes) {
	var Answer =  sequelize.define('Answer', {
	  answer_text: DataTypes.STRING
	}, {
		underscored: true,
		classMethods: {
      associate: function(models) {
        Answer.belongsTo(models.Question, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
        Answer.hasMany(models.Response,{});
      }
    }
	});

	return Answer;
};
