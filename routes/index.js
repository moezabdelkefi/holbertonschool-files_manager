const express = require('express');
const AppController = require('../controllers/AppController');
const UsersController = require('../controllers/UsersController');
const AuthController = require('../controllers/AuthController');

const router = (app) => {
  const paths = express.Router();
  app.use(express.json());
  app.use('/', paths);

  router.get('/status', AppController.getStatus);
  router.get('/stats', AppController.getStats);
  router.post('/users', UsersController.postNew);
  paths.get('/connect', ((request, response) => AuthController.getConnect(request, response)));
  paths.get('/disconnect', ((request, response) => AuthController.getDisconnect(request, response)));
};
module.exports = router;
