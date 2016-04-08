module.exports = function(sequelize, DataTypes){
	var Response =  sequelize.define('Response', {
	  response_id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false
    }
	}, {
		underscored: true,
		classMethods: {
      associate: function(models) {
        Response.belongsTo(models.Answer, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
        Response.belongsTo(models.User, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
	});

	return Response;
};