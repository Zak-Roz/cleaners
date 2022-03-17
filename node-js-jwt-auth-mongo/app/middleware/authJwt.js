const jwt = require('jsonwebtoken');
const config = require('../config/auth.config.js');
const { User } = require('../models');
const { ObjectId } = require('mongodb');

const verifyToken = (req, res, next) => {
  try {
    let token = req.headers['x-access-token'];

    if (!token) {
      return res.status(403).send({
        message: 'Не надано токен!'
      });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: 'Неавторизований вхід!' });
      }
      req.userId = decoded.id;
      next();
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(ObjectId(req.userId));
    for(let i = 0; i < user.right.length; i++) {
      if (user.right[i] === 2) {
        next();
        return;
      }
    }
    return res.status(403).send({
      message: 'Необхідні права Адміністратора!'
    });
  } catch (err) {
    return res.status(505).send({ error: err.message });
  }
};


const authJwt = {
  verifyToken,
  isAdmin,
};
module.exports = authJwt;
