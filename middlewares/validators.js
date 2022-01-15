const RegExp = /^([0-3][0-1]|[0-2]\d)\/(0[1-9]|1[0-2])\/\d{4}/; // Gustavo Sant'Anna da turma 14B que ajudou a fazer o regex pra validar a data

const tokenValidator = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  if (token.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  return next();
};

const nameValidator = (req, res, next) => {
  const { name } = req.body;
  if (!name || name === '') {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res
      .status(400)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }

  next();
};

const ageValidator = (req, res, next) => {
  const { age } = req.body;
  if (!age || age === '') {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return res
      .status(400)
      .json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
};

const talkValidator = (req, res, next) => {
  const { talk } = req.body;

  if (!talk || !talk.watchedAt || !talk.rate) {
    return res.status(400).json({
      message:
        'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  next();
};

const rateValidator = (req, res, next) => {
  const {
    talk: { rate },
  } = req.body;

  if (rate < 1 || rate > 5) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }
  next();
};

const watchedValidator = (req, res, next) => {
  const { talk } = req.body;
  if (!RegExp.test(talk.watchedAt)) {
    return res
      .status(400)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

module.exports = {
  tokenValidator,
  talkValidator,
  watchedValidator,
  rateValidator,
  nameValidator,
  ageValidator,
};
