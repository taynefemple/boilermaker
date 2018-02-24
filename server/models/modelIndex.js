const Stuff = require('./stuff');
const OtherStuff = require('./otherStuff');
const db = require('../../db.js')

OtherStuff.belongsTo(Stuff);

module.exports = db;
