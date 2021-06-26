const UsersModel = require('../models/UserModel');

module.exports = {

	async listAll(req, res, next) {
		try {

			const results = await UsersModel.findAll();

			if (results && results.length > 0) {
				return res.status(200).json(results);
			} else {
				return res.status(404).json({ message: "Não existe usuários cadastrados!" });
			}
		} catch (error) {
			next(error);
		}
	},

	async getUser(req, res, next) {
		try {
			const { id } = req.params;

			if (id > 0) {
				const user = await UsersModel.findOne({ where: { id } });

				if (user) {
					return res.status(200).json(user);
				} else {
					return res.status(404).json({ message: "Usuário não encontrado." });
				}
			} else {
				return res.status(500).json({ message: "Erro, id do usuário não foi informado." });
			}
		} catch (error) {
			next(error);
		}
	},

	async create(req, res, next) {
		try {
			const { name, email, password } = req.body;

			let user = await UsersModel.findOne({ where: { email } });

			if (!user) {

				if (!user) {
					user = await UsersModel.create({ name, email, password });
				}

				if (user) {
					return res.status(201).send();
				} else {
					return res.status(500).json({ message: "Ocorreu um erro, não foi possível salvar o usuário." });
				}
			} else {
				return res.status(500).json({ message: "O email informado já está em uso." });
			}
		} catch (error) {
			next(error);
		}
	},

	async update(req, res, next) {
		try {
			const { id, name, email, password } = req.body;

			if (id > 0) {

				let userUpdated = await UsersModel.update({ name, email, password }, { where: {id} });

				if (userUpdated) {
					return res.send();
				}

				return res.status(500).json({ message: "Ocorreu um erro, não foi possível atualizar o usuário." });

			} else {
				return res.status(500).json({ message: "Ocorreu um erro, id do usuário não foi informado ou está vazio." });
			}
		} catch (error) {
			next(error);
		}
	},

	async delete(req, res, next) {
		try {
			const { id } = req.params;

			if (id > 0) {
				const user = await UsersModel.destroy({ where: { id } });

				if (user) {
					return res.send();
				} else {
					return res.status(500).json({ message: "Ocorreu um erro, não foi possível excluir o usuário. Verifique o id informado." });
				}
			} else {
				return res.status(500).json({ message: "O id do usuário não foi informado." });
			}
		} catch (error) {
			next(error);
		}
	},
}
