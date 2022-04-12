const admin = require('firebase-admin');

//save cookies
module.exports = function savecookie(token, res) {
  //generate token expire time  eg-1day
  const expiresIn = 60 * 60 * 24 * 1 * 1000;

  //craete session with token
  admin
    .auth()
    .createSessionCookie(token, { expiresIn })
    .then(
      (cookieData) => {
        const options = { maxAge: expiresIn, httpOnly: true, secure: true };
        //send cookie in response
        res.cookie('session', cookieData);

        //redirect user to success route
        admin
          .auth()
          .verifyIdToken(token)
          .then((decodedToken) => {
            res.redirect('/success');
          });
      },
      (error) => {
        console.log(error);
        res.status(401).send('UnAuthorised Request');
      }
    );
};
