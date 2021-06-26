const express = require('express');
const routes = express.Router();
const auth = require('./app/middlewares/auth');

const SessionController = require('./app/controllers/SessionController');
const UserController = require('./app/controllers/UserController');
const PlanController = require('./app/controllers/PlanController');
const CorreiosController = require('./app/controllers/CorreiosController');

routes
	.get('/', SessionController.index)
	.get('/api', SessionController.index)
	.post('/api/login', SessionController.login)
	//
	.get('/api/users', auth.verifyJWT, UserController.listAll)
	.get('/api/users/:id', auth.verifyJWT, UserController.getUser)
	.post('/api/users', auth.verifyJWT, UserController.create)
	.put('/api/users', auth.verifyJWT, UserController.update)
	.delete('/api/users/:id', auth.verifyJWT, UserController.delete)
	//
	.get('/api/plan', auth.verifyJWT, PlanController.listAll)
	.get('/api/plan/:id', auth.verifyJWT, PlanController.getPlan)
	.post('/api/plan', auth.verifyJWT, PlanController.create)
	.put('/api/plan', auth.verifyJWT, PlanController.update)
	.delete('/api/plan/:id', auth.verifyJWT, PlanController.delete)
	//
	.get('/api/correios/:cep', auth.verifyJWT, CorreiosController.getCep);

module.exports = routes;
