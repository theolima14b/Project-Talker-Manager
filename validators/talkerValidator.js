// const RegExp = /^([0-3][0-1]|[0-2]\d)\/[1-12]{2}\/\d{4}/;

const tokenValidator = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (authorization.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  next();
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

// O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios
// O campo "rate" deve ser um inteiro de 1 à 5
// 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"'

module.exports = {
  nameValidator,
  ageValidator,
  tokenValidator,
};
