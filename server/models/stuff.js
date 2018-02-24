const db = require('../../db');
const Sequelize = require('sequelize');

const Stuff = db.define('stuff', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: Sequelize.TEXT
})

module.exports = Stuff;
