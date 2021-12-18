const express = require('express');
const bcrypt = require('bcrypt');
var constants = require('../config/consts');
const User = require('../user/User');

const app = express();
app.use(express.json());

app.post('/api/1.0/users', (req, res) => {
  bcrypt.hash(req.body.password, constants.HASH_ROUND).then((hash) => {
    const userObj = { ...req.body, password: hash };
    // const userObj = Object.assign({}, req.body, { password: hash });
    // const userObj = {
    //   username: req.body.username,
    //   email: req.body.email,
    //   password: hash,
    // };
    User.create(userObj).then(() => {
      return res.send({ message: 'User created' });
    });
  });
});

module.exports = app;
