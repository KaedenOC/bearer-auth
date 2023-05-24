'use strict';

const base64 = require('base-64');
const { user } = require('../models/index.js');

module.exports = async (req, res, next) => {

  if (!req.headers.authorization) {
    next('Not authorized, no token present!');
    return;
  }

  let basic = req.headers.authorization.split(' ').pop();
  let [username, pass] = base64.decode(basic).split(':');

  try {
    req.user = await user.authenticateBasic(username, pass);
    next();
  } catch (error) {
    console.error(error);
    res.status(403).send('Invalid Login');
  }

};
