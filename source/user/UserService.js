const bcrypt = require('bcrypt');
const constants = require('../config/consts');
const User = require('./User');

const save = async (requestBody) => {
  const hash = await bcrypt.hash(requestBody.password, constants.HASH_ROUND);
  const userObj = { ...requestBody, password: hash };
  await User.create(userObj);
};

module.exports = {
  save,
};
