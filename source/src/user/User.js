const Sequelize = require('sequelize');
const sequelizeInstance = require('../config/database');

const Model = Sequelize.Model;

class User extends Model {}

User.init(
  {
    username: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: 'user',
  }
);

module.exports = User;
