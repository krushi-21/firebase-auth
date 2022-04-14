const express = require('express');
const cookieParser = require('cookie-parser');
const admin = require('firebase-admin');
require('dotenv').config();
const key = require('./firebase.json');
const checkUserAuth = require('./middlewares/checkAuth');
const { createToken } = require('./utils/token');

const app = express();

const port = process.argv[2] || 3000;
var config = {
  apiKey: process.env.APIKEY,

  authDomain: process.env.AUTHDOMAIN,

  projectId: process.env.PROJECTID,

  storageBucket: process.env.STORAGEBUCKET,

  messagingSenderId: process.env.MESSAGINGSENDERID,

  appId: process.env.APPID,
};
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
  res.render('index', config);
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
  const token = createToken(Idtoken);
  res.cookie('session', token);
  res.redirect('/success');
});

//create server
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
