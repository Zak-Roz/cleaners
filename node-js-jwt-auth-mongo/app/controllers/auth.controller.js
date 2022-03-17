require('dotenv').config();

const genPass = require('generate-password');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const { User, Right } = require('../models');
const config = require('../config/auth.config');

function sendEmail({ password, code, user }) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_NAME, 
      pass: process.env.EMAIL_PASSWORD
    }
  });
  let mailOptions = {
    from: process.env.EMAIL_NAME, 
    to: user.login,
    subject: 'Хімчистка авторизація',
    text: `Ваш логін у системі: ${user.login}\nВаш пароль: ${password}\nВаш код: ${code}`
  };
  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      return console.log(`Помилка: ${err}`);
    }
    return console.log('Лист надіслано!!!');
  });
}

exports.signup = async (req, res) => {
  try {
    const password = genPass.generate({
      length: 20,
      numbers: true,
      symbols: '!#@*&^'
    });
    console.log('🚀 ~ file: auth.controller.js ~ line 20 ~ password', req.body.password || password);
    const user = await new User({
      fullname: req.body.fullname,
      login: req.body.login,
      code: bcrypt.hashSync(req.body.code, 5),
      registeredAt: new Date(),
      wallet: Math.floor(Math.random() * 500),
      password: bcrypt.hashSync(req.body.password || password, 8),
      status_u: 1,
    }).save();
    if (req.body.rights.length) {
      const rights = [];
      for(let i = 0; i< req.body.rights.length; i++) {
        const right = await Right.find({
          name: req.body.rights[i]
        });
        rights.push(right);
      }
      rights.forEach((el)=>{
        user.right.push(el[0]._id);
      });
      await user.save();
      sendEmail({ password, code: req.body.code, user });
      return res.send({ message: 'Користувача успішно зареєстровано! Логін і пароль відправлені на ел. пошту!' });
    } else {
      res.status(400).send({
        message: 'Помилка! Виберіть рівень доступу!'
      });
    }
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

exports.updateStorage = async (req, res) => {
  const user = await User.findOne({
    login: req.query.login
  });
  if (!user) {
    return res.send({ error: 'Користувача не знайдено.' });
  }
  return res.send({ user });
};

exports.signin = async (req, res) => {
  try{
    const user = await User.findOne({
      login: req.body.login
    });
    if (!user) {
      return res.status(404).send({ message: 'Користувача не знайдено.' });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: 'Невірний пароль!'
      });
    }

    const token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 5400 // 24 hours -> 86400
    });

    if(user.status_u === 1) {
      user.status_u = 2;
      await user.save();
    }
    if(user.status_id === 3) {
      res.status(403).send({
        id: user._id,
        fullname: user.fullname,
        wallet: user.wallet,
        login: user.login,
        message: 'Вас було заблоковано! Зверніться в підтримку!',
      });
    }
    const authorities = [];
    for(let i = 0; i< user.right.length; i++) {
      const right = await Right.findById(user.right[i]);
      authorities.push('RIGHT_' + right.name.toUpperCase());
    }
    return res.status(200).send({
      id: user._id,
      fullname: user.fullname,
      login: user.login,
      wallet: user.wallet,
      rights: authorities,
      accessToken: token
    });
  }catch(err) {
    res.status(500).send({ message: err.message });
  }
};
