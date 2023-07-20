const UserSchema = require('../models/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET;

const login = async (req, res) => {
  try {
    const user = await UserSchema.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).send({
        message: 'Usuário não encontrado',
        email: req.body.email
      });
    }

    const validPassword = bcrypt.compareSync(req.body.password, user.password);

    if (!validPassword) {
      return res.status(401).send({
        message: 'Senha inválida',
        statusCode: 401
      });
    }

    const token = jwt.sign({ nome: user.nome }, SECRET);

    res.status(200).send({
      message: 'Login efetuado com sucesso',
      token
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: 'Erro interno do servidor',
      statusCode: 500
    });
  }
};

const createUser = async (req, res) => {
  try {
    const { nome, email, password } = req.body;

    const existingUser = await UserSchema.findOne({ email });

    if (existingUser) {
      return res.status(409).send({
        message: 'Já existe um usuário com esse email',
        email
      });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = await UserSchema.create({
      nome,
      email,
      password: hashedPassword
    });

    res.status(201).send({
      message: 'Usuário criado com sucesso',
      userId: newUser._id
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: 'Erro interno do servidor',
      statusCode: 500
    });
  }
};

module.exports = {
  login,
  createUser
};