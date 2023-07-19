const Jogo = require('../models/jogo');

// GET /jogos
exports.getAllJogos = async (req, res) => {
  try {
    const jogos = await Jogo.find();
    res.json(jogos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /jogos/:id
exports.getJogoById = async (req, res) => {
  try {
    const jogo = await Jogo.findById(req.params.id);
    if (!jogo) {
      return res.status(404).json({ message: 'Jogo não encontrado' });
    }
    res.json(jogo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /jogos
exports.createJogo = async (req, res) => {
  try {
    const jogo = new Jogo(req.body);
    const novoJogo = await jogo.save();
    res.status(201).json(novoJogo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT /jogos/:id
exports.updateJogo = async (req, res) => {
  try {
    const jogo = await Jogo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!jogo) {
      return res.status(404).json({ message: 'Jogo não encontrado' });
    }
    res.json(jogo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE /jogos/:id
exports.deleteJogo = async (req, res) => {
  try {
    const jogo = await Jogo.findByIdAndDelete(req.params.id);
    if (!jogo) {
      return res.status(404).json({ message: 'Jogo não encontrado' });
    }
    res.json({ message: 'Jogo deletado com sucesso' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
