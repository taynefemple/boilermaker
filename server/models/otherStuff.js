const db = require('../../db.js');
const Sequelize = require('sequelize');

const OtherStuff = db.define('otherstuff', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: Sequelize.TEXT
})

module.exports = OtherStuff;
