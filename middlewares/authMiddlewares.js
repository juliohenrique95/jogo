const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

exports.authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Sem autorização' });
  }

  const token = authHeader.split(' ')[1];

  try {
    jwt.verify(token, SECRET, (err) => {
      if (err) {
        return res.status(401).json({ message: 'Não autorizado' });
      }
      next();
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};
