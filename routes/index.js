const express = require('express');
const AppController = require('../controllers/AppController');
const UsersController = require('../controllers/UsersController');
const AuthController = require('../controllers/AuthController');

const router = (app) => {
  const paths = express.Router();
  app.use(express.json());
  app.use('/', paths);

  paths.get('/status', ((request, response) => AppController.getStatus(request, response)));
  paths.get('/stats', ((request, response) => AppController.getStats(request, response)));
  paths.post('/users', ((request, response) => UsersController.postNew(request, response)));
  paths.get('/connect', ((request, response) => AuthController.getConnect(request, response)));
  paths.get('/disconnect', ((request, response) => AuthController.getDisconnect(request, response)));
};

module.exports = router;
