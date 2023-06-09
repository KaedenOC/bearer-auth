'use strict';

const { users } = require('../models/index.js');

module.exports = async (req, res, next) => {

  try {

    if (!req.headers.authorization) {
      next('Invalid Login');
    }

    const token = req.headers.authorization.split(' ').pop();
    const validUser = await users.authenticateToken(token);

    req.user = validUser;
    req.token = validUser.token;
    next(); //move on to the next middleware

  } catch (error) {
    console.error(error);
    res.status(403).send('Invalid Login');
  }
};
