const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const {
  nameValidator,
  tokenValidator,
  ageValidator,
  talkValidator,
  rateValidator,
  watchedValidator,
} = require('./middlewares/talkerValidator');
const { newToken } = require('./middlewares/generateToken');

const app = express();
app.use(bodyParser.json());

const readTalkerFile = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));

const RegExp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/; //  Gustavo Sant'Anna da turma 14B que ajudou a fazer o regex pra validar o email
const HTTP_OK_STATUS = 200;
const PORT = '3000';

// REQUISITO 1:

app.get('/talker', (_request, response) => {
  response.status(HTTP_OK_STATUS).json(readTalkerFile);
});

// REQUISITO 2:

app.get('/talker/:talkerId', (req, res) => {
  const { talkerId } = req.params;

  const getTalkerById = readTalkerFile.find(
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
  if (!RegExp.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    return res
      .status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  return res.status(200).json({ token: `${newToken}` });
});

// REQUISITO 4:

app.post('/talker', 
tokenValidator, nameValidator, ageValidator, 
talkValidator, rateValidator, watchedValidator,
(req, res) => {
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const newTalker = {
    name: `${name}`,
    age,
    id: readTalkerFile.length + 1,
    talk: { rate, watchedAt: `${watchedAt}` },
  };
  readTalkerFile.push(newTalker);
  fs.writeFileSync('./talker.json', JSON.stringify(readTalkerFile));
  return res.status(201).json(newTalker);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
