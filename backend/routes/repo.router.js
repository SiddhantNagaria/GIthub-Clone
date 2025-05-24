const express = require('express');
const repoController = require("../controllers/repoController");

const repoRouter = express.Router();

repoRouter.post('/repo/create', repoController.createRpository);
repoRouter.get('/repo/all', repoController.getALlRepositories);
repoRouter.get('/repo/:id', repoController.fetchRespositoryById);
repoRouter.get('/repo/:name', repoController.fetchRespositoryByName);
repoRouter.get('/repo/:userID', repoController.fetchRespositoryForCurrentUser);
repoRouter.put('/repo/update/:id', repoController.updateRepositoryById);
repoRouter.delete('/repo/delete/:id', repoController.deleteRepositoryById);
repoRouter.patch('/repo/toggle/:id', repoController.toggleVisibilityById);

module.exports = repoRouter;