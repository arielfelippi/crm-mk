const { Model, DataTypes } = require('sequelize');

class Plans extends Model {
	static init(connection) {
		super.init({
			plan: DataTypes.STRING,
			client_name: DataTypes.STRING,
			address: DataTypes.STRING,
			cep: DataTypes.STRING,
			cpf: DataTypes.BIGINT,
		}, {
			sequelize: connection
		});
	}

}

module.exports = Plans;
