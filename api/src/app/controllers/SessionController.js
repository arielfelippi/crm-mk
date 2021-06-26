const jwt = require('jsonwebtoken');
const AuthConfig = require('../../config/authConfig');
const UsersModel = require('../models/UserModel');

module.exports = {

	async index(req, res, next) {
		try {
			res.status(200).json({ message: 'Bem vindo a api MK Solutions!', routes: '' });
		} catch (error) {
			next(error);
		}
	},

	async login(req, res, next) {
		try {
			const { name, email, password } = req.body;

			let user = await UsersModel.findOne({ where: { email } });

			if (!user) {
				user = await UsersModel.create({ name, email, password });
			}

			if (user.email == email && user.password == password) {

				const token = jwt.sign({ userId: user.id }, AuthConfig.secret, { expiresIn: AuthConfig.expiresIn });

				return res.status(200).json({ auth: true, token });
			}

			return res.status(401).json({ message: "E-mail ou senha inválidos." });

		} catch (error) {
			next(error);
		}
	}
}
