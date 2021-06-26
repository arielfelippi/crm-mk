const PlanModel = require('../models/PlanModel');

module.exports = {

	async listAll(req, res, next) {
		try {

			const results = await PlanModel.findAll();

			if (results && results.length > 0) {
				return res.status(200).json(results);
			}

			return res.status(404).json({ message: "Não existe planos cadastrado!" });

		} catch (error) {
			next(error);
		}
	},

	async getPlan(req, res, next) {
		try {
			const { id } = req.params;

			if (id > 0) {
				const plan = await PlanModel.findOne({ where: { id } });

				if (plan) {
					return res.status(200).json(plan);
				}

				return res.status(404).json({ message: "Plano não encontrado." });

			}

			return res.status(500).json({ message: "Erro, id do plano não foi informado." });

		} catch (error) {
			next(error);
		}
	},

	async create(req, res, next) {
		try {
			const { plan, client_name, address, cep, cpf } = req.body;

			let objPlan = await PlanModel.findOne({ where: { plan } });

			if (!objPlan) {

				objPlan = await PlanModel.create({ plan, client_name, address, cep, cpf });

				if (objPlan) {
					return res.status(201).send();
				}

				return res.status(500).json({ message: "Ocorreu um erro, não foi possível criar o plano." });

			}

			return res.status(500).json({ message: "O plano informado já está cadastrado." });

		} catch (error) {
			next(error);
		}
	},

	async update(req, res, next) {
		try {
			const { id, plan, client_name, address, cep, cpf } = req.body;

			if (id > 0) {

				let planUpdated = await PlanModel.update({ plan, client_name, address, cep, cpf }, { where: { id } });

				if (planUpdated) {
					return res.send();
				}

				return res.status(500).json({ message: "Ocorreu um erro, não foi possível atualizar o plano." });

			}

			return res.status(500).json({ message: "Ocorreu um erro, id do plano não foi informado ou é inválido." });

		} catch (error) {
			next(error);
		}
	},

	async delete(req, res, next) {
		try {
			const { id } = req.params;

			if (id > 0) {
				const plan = await PlanModel.destroy({ where: { id } });

				if (plan) {
					return res.send();
				}

				return res.status(500).json({ message: "Ocorreu um erro, não foi possível excluir o plano. Verifique o id informado." });

			}

			return res.status(500).json({ message: "O id do plano não foi informado." });

		} catch (error) {
			next(error);
		}
	},
}
