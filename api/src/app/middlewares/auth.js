const jwt = require('jsonwebtoken')
const AuthConfig = require('../../config/authConfig')

module.exports = {

	verifyJWT(req, res, next) {
		try {

			const token = req.headers["authorization"];
			jwt.verify(token, AuthConfig.secret, (error, decoded) => {
				if (error) {
					return res.status(401).end();
				}

				next();
			});

		} catch (error) {
			next(error);
		}
	},
}
