const db = require('../../db');
const Sequelize = require('sequelize');
const crypto = require('crypto');
const _ = require('lodash')

const Stuff = db.define('stuff', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: Sequelize.TEXT,
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING
  },
  salt: {
    type: Sequelize.STRING
  }
},
  {
    hooks: {
      beforeCreate: setSaltAndPassword,
      beforeUpdate: setSaltAndPassword
    }
  })

Stuff.prototype.correctPassword = function (candidatePassword) {
  return this.Model.encryptPassword(candidatePassword, this.salt) === this.password;
};

Stuff.prototype.sanitize = function () {
  return _.omit(this.toJSON(), ['password', 'salt']);
};

Stuff.generateSalt = function () {
  return crypto.randomBytes(16).toString('base64');
};

Stuff.encryptPassword = function (plainText, salt) {
  const hash = crypto.createHash('sha1');
  hash.update(plainText);
  hash.update(salt);
  return hash.digest('hex');
};

function setSaltAndPassword(stuff) {
  if (stuff.changed('password')) {
    stuff.salt = Stuff.generateSalt()
    stuff.password = Stuff.encryptPassword(stuff.password, stuff.salt)
  }
}

module.exports = Stuff;
