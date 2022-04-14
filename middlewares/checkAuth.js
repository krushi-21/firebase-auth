const admin = require('firebase-admin');
const { verifyToken } = require('../utils/token');

//check auth with cookie
module.exports = async function checkUserAuth(req, res, next) {
  const user = await verifyToken(req.cookies.session);
  if (!user) {
    return res.status(401).json({
      status: 'fail',
      statusCode: 401,
      message: 'unauthorized',
    });
  }
  const data = await admin.auth().verifyIdToken(user.token);

  req.user = data;
  return next();
};
