const jwt = require('jsonwebtoken');

//creating JWT token for user
exports.createToken = (token) => {
  console.log('in token create');
  return jwt.sign({ token: token }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

exports.verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {}
  return null;
};
