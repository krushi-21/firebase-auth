const express = require('express');
const cookieParser = require('cookie-parser');
const admin = require('firebase-admin');

const key = require('./nodeauth-2f958-firebase-adminsdk-gb1ji-5fe04be0a6.json');
const checkUserAuth = require('./middlewares/checkAuth');
const savecookie = require('./middlewares/saveCookies');

const app = express();

const port = process.env.PORT || 3000;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//ejs setup
app.set('view engine', 'ejs');

//initializing firebase setup
admin.initializeApp({
  credential: admin.credential.cert(key),
});

//app routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/success', checkUserAuth, (req, res) => {
  //send user data to ejs page
  res.render('userData', { user: req.user });
});

app.get('/logout', (req, res) => {
  res.clearCookie('session');
  res.redirect('/');
});

//saving firebase token in cookies
app.get('/savecookie', (req, res) => {
  const Idtoken = req.query.id;
  savecookie(Idtoken, res);
});

//create server
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
