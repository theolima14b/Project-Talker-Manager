const generateToken = () => {
  const allChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split('');
  const token = [];
    for (let i = 0; i < 16; i += 1) {
      const oneChar = (Math.random() * (allChars.length - 1)).toFixed(0);
      token[i] = allChars[oneChar];
    }
    return token.join('');
  };
  
  const newToken = generateToken();
  
  module.exports = {
    newToken,
  };