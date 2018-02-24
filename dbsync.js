const db = require('./server/models/modelIndex.js');
const app = require('./server/index.js');
const port = process.env.PORT || 3000;

db.sync({ force: true })
  .then(function () {
    app.listen(port)
  })
  .then(() =>
    console.log('It\'s getting hot in herrr')
  )

