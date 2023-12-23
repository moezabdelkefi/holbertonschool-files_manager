const express = require('express');
const AppController = require('../controllers/AppController');
const UsersController = require('../controllers/UsersController');
const AuthController = require('../controllers/AuthController');
const FilesController = require('../controllers/FilesController');

const router = (app) => {
  const paths = express.Router();
  app.use(express.json());
  app.use('/', paths);

  paths.get('/status', AppController.getStatus);
  paths.get('/stats', AppController.getStats);
  paths.post('/users', UsersController.postNew);
  paths.get('/connect', AuthController.getConnect);
  paths.get('/disconnect', AuthController.getDisconnect);
  paths.put('/files/:id/publish', FilesController.putPublish);
  paths.put('/files/:id/unpublish', FilesController.putUnpublish);
};

module.exports = router;
