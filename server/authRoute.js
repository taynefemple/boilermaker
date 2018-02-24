const router = require('express').Router();

router.post('/', (req, res, next) => {
  Stuff.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(stuff => {
      if (!stuff) res.status(401).send('That stuff ain\'t stuff');
      else if (!stuff.hasMatchingPassword(req.body.password)) res.statu(401).send('Password incorrect');
      else {
        req.login(stuff, err => {
          if (err) next(err);
          else res.json(stuff);
        })
      }
    })
    .catch(next);
});

module.exports = router;
