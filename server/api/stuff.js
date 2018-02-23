const router = require('express').Router;

router.get('/', (req, res, next) =>
  res.send('STUFF!')
)

module.exports = router
