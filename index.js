const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.get('/talker', (_request, response) => {
  const getTalker = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));

  response.status(HTTP_OK_STATUS).json(getTalker);
});

app.get('/talker/:talkerId', (req, res) => {
  const { talkerId } = req.params;

  const getTalker = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));

  const getTalkerById = getTalker.find((talker) => talker.id === Number(talkerId));

  if (!getTalkerById) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  return res.status(HTTP_OK_STATUS).json(getTalkerById);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
