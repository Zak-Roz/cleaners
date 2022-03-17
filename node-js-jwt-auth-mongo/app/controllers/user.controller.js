const bcrypt = require('bcryptjs');
const { User, Order } = require('../models');

exports.allUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    let user = null;
    if (req.query.id) {
      user = await User.findById(req.query.id);
      if (user) {
        const authorities = [];
        user.right.forEach((el)=>{
          authorities.push(el.name);
        });
        return res.json({user, authorities});
      }
    }
    return res.json(user);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

exports.getAllByAdmin = async (req, res) => {
  try {
    let users = null;
    if (req.query.id) {
      users = await Order.find().populate('user').populate('status_order').populate('cleaner').sort({date: -1 });
      users = users.filter((el) => el.cleaner.owner == req.query.id);
      users = [...new Set(users.map((el) => el.user))];
    }
    if (!users.length) {
      throw new Error('У вас немає клієнтів!');
    }
    return res.json(users);
  } catch (err) {
    return res.send({ error: err.message });
  }
};

exports.forgotPass = async (req, res) => {
  try{
    const user = await User.findOne({
      login: req.body.login
    });
    if (!user) {
      return res.status(404).send({ message: 'Користувача не знайдено.' });
    }
    
    const codeIsValid = await bcrypt.compare(
      req.body.code,
      user.code,
    );

    if (!codeIsValid) {
      return res.status(401).send({
        message: 'Код не вірний',
      });
    }

    const passwordDublicate = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (passwordDublicate) {
      return res.status(401).send({
        message: 'Новий пароль зараз використовуться!',
      });
    }
    const password = bcrypt.hashSync(req.body.password, 8);
    user.password = password;
    await user.save();
    return res.send({ message: 'Пароль успішно змінено!' });
  }catch(err) {
    return res.status(500).send({ message: err.message });
  }
};

exports.updatePass = async (req, res) => {
  try{
    const user = await User.findOne({
      login: req.body.login
    });
    if (!user) {
      return res.status(404).send({ message: 'Користувача не знайдено.' });
    }

    const passwordDublicate = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (passwordDublicate) {
      return res.status(401).send({
        message: 'Новий пароль зараз використовуться!',
      });
    }
    let passwordIsValid = bcrypt.compareSync(
      req.body.oldPassword,
      user.password,
    );

    if (!passwordIsValid) {
      passwordIsValid = bcrypt.compareSync(
        req.body.oldPassword,
        user.code,
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          message: 'Пароль не вірний',
        });
      }
    }
    const password = bcrypt.hashSync(req.body.password, 8);
    user.password = password;
    await user.save();
    return res.send({ message: 'Пароль успішно змінено!' });
  }catch(err) {
    return res.status(500).send({ message: err.message });
  }
};

exports.changeWallet = async (req, res) => {
  try{
    const user = await User.findOne({
      login: req.body.login
    });
    if (!user) {
      return res.status(404).send({ message: 'Користувача не знайдено.' });
    }
    user.wallet = req.body.wallet;
    await user.save();
    return res.send({ message: 'Success' });
  }catch(err) {
    return res.status(500).send({ message: err.message });
  }
};

exports.allAccess = (req, res) => {
  return res.status(200).send('Публічні дані.');
};

exports.userBoard = (req, res) => {
  return res.status(200).send('Дані Користувача.');
};

exports.adminBoard = (req, res) => {
  return res.status(200).send('Дані Адміністратора.');
};