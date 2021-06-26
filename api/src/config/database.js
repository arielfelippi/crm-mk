module.exports = {
	dialect: 'postgres',
	host: process.env.HOST_DB || 'localhost',
	port: process.env.PORT_DB || '5432',
	database: process.env.DB || 'mk_crm',
	username: process.env.USER_DB || 'postgres',
	password: process.env.PASS_DB || 'asdf000',
	define: {
		timestamps: true,
		underscored: true,
	},
	pool: {
		max: 10,
		min: 0,
		idle: 20000
	}
};
