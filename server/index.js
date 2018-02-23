const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path')
const bodyParser = require('body-parser')
const router = require('./api/apiIndex')
const port = process.env.PORT || 3000;


app.use(morgan(dev));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', router)

app.use(express.static(path.join(__dirname, '../public')));

app.use('*', (req, res) =>
  res.send(path.join(__dirname, '../public/index.html'))
)

app.listen(port, () =>
  console.log('It\'s getting hot in herrr')
)

app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err || 'Server error')
});
