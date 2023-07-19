const express = require('express');
const router = express.Router();

const jogoController = require('../controllers/jogoController');
const authMiddleware = require('../middlewares/authMiddleware');

// Rotas públicas
router.get('/jogos', jogoController.getAllJogos);
router.post('/jogos', jogoController.createJogo);
router.put('/jogos/:id', jogoController.updateJogo);
router.delete('/jogos/:id', jogoController.deleteJogo);

// Rota privada que requer autenticação
router.get('/jogos/:id', authMiddleware.authenticate, jogoController.getJogoById);

module.exports = router;