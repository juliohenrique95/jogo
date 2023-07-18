const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
const jogoRoutes = require('./routes/jogoRoutes');
app.use('/api', jogoRoutes);

// Database connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida');
  })
  .catch((error) => {
    console.error('Erro na conexão com o banco de dados:', error.message);
  });

// Start server
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
