module.exports = function(sequelize, DataTypes){
	var Admin =  sequelize.define('Admin', {
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		password: DataTypes.STRING
	});
	return Admin;
};