'use strict';

const base64 = require('base-64');
const { user } = require('../models/index.js');
const _authError = require('../error-handlers/404.js');

module.exports = async (req, res, next) => {

  if (!req.headers.authorization) {
    return _authError(res);
  }

  let basic = req.headers.authorization;
  let [username, pass] = base64.encode(basic).split(':');

  try {
    req.user = await user.authenticateBasic(username, pass);
    next();
  } catch (e) {
    console.error(e);
    res.status(403).send('Invalid Login');
  }

};
