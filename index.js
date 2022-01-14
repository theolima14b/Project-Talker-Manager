const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
// const {
//   nameValidator,
//   ageValidator,
//   tokenValidator,
// } = require('./validators/talkerValidator');

const app = express();
app.use(bodyParser.json());

const RegExp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/; // Gustavo Sant'Anna da turma 14B que forneceu o regex pra validar o email
const HTTP_OK_STATUS = 200;
const PORT = '3000';

// REQUISITO 1:

app.get('/talker', (_request, response) => {
  const getTalker = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));

  response.status(HTTP_OK_STATUS).json(getTalker);
});

// REQUISITO 2:

app.get('/talker/:talkerId', (req, res) => {
  const { talkerId } = req.params;

  const getTalker = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));

  const getTalkerById = getTalker.find(
    (talker) => talker.id === Number(talkerId),
  );

  if (!getTalkerById) {
    return res
      .status(404)
      .json({ message: 'Pessoa palestrante não encontrada' });
  }

  return res.status(HTTP_OK_STATUS).json(getTalkerById);
});

// REQUISITO 3:

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!RegExp.test(email)) { // função e regex feitas com ajuda de Gustavo San'Anna
    return res
      .status(400)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
  return res.status(HTTP_OK_STATUS).json({ token: '7mqaVRXJSp886CGr' });
});

// REQUISITO 4:

// app.post('/talker',
//   nameValidator, 
//   ageValidator,
//   tokenValidator,
//   (req, res) => {
//   const { name, age, talk: { watchedAt, rate } } = req.body;
//   return res.status(201).json({ name, age, talk: { watchedAt, rate } });
// });

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
