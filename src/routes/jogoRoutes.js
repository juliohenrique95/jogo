const express = require('express');
const router = express.Router();

const jogoController = require('../controllers/jogoControllers');
const { checkAuth } = require('../middlewares/authMiddlewares');
const autUser = require('../controllers/autUser');

// Rotas públicas
router.get('/todosResultados', jogoController.getAllJogos);
router.post('/novoJogo', checkAuth, jogoController.createJogo);
router.patch('/atualizaJogo/:id', jogoController.updateJogo);
router.delete('/deletarJogo/:id', jogoController.deleteJogo);

router.post('/novoUsuario', autUser.createUser);
router.post('/login', autUser.login)

module.exports = router;