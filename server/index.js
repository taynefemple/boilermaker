const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const router = require('./api/apiIndex');
const session = require('express-session');
const db = require('../db.js');
const passport = require('passport');
const auth = require('./authRoute')
const Stuff = require('./models/stuff.js')

const SequelizeStore = require('connect-session-sequelize')(session.Store);
const dbStore = new SequelizeStore({ db });

dbStore.sync();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET || 'sofreshandsocleanclean',
  store: dbStore,
  resave: false,
  saveUnitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((stuff, done) => {
  try {
    done(null, stuff.id);
  } catch (err) {
    done(err);
  }
});

passport.deserializeUser((id, done) =>
  Stuff.findById(id)
    .then(user => done(null, user))
    .catch(done)
)


app.use('/api', router);
app.use('/login', auth);

app.use(express.static(path.join(__dirname, '../public')));

app.use('*', (req, res) =>
  res.send(path.join(__dirname, '../public/index.html'))
);

app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err || 'Server error')
});

module.exports = app
