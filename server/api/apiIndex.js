const router = require('express').Router;
const stuff = require('./stuff')

router.use('/stuff', stuff);

router.use(function (req, res, next) {
  const err = new Error('not found');
  err.status = 404;
  next(err);
})

module.exports = router;

