const admin = require('firebase-admin');

//check auth with cookie
module.exports = function checkUserAuth(req, res, next) {
  //get cookie
  const sessionCookie = req.cookies.session || '';
  //save user in req.user
  admin
    .auth()
    .verifySessionCookie(sessionCookie)
    .then((userData) => {
      req.user = userData;
      next();
    })
    .catch((error) => {
      res.redirect('/');
    });
};
