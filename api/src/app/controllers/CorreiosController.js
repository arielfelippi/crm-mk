require('dotenv/config');

const axios = require('axios');

module.exports = {
	async getCep(req, res, next) {
		try {
			try {
				const { cep } = req.params;

				const url = process.env.URL_CEP_CORREIOS + `${cep}/json/`;

				return await axios.get(url).then((response) => {
					return res.status(200).send(response.data);
				});

			} catch (error) {
				next(error);
			}

		} catch (error) {
			next(error);
		}
	}
}
