const { Order, StatusOrder } = require('../models');
const { ObjectId } = require('mongodb');

exports.getById = async (req, res) => {
  try {
    let order = null;
    if (req.query.id) {
      order = await Order.findById(ObjectId(req.query.id)).populate('user').populate('status_order').populate('cleaner');
    }
    return res.json(order);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

exports.getAllByUser = async (req, res) => {
  try {
    let order = null;
    if (req.query.id) {
      order = await Order.find({ user: ObjectId(req.query.id) }).populate('user').populate('status_order').populate('cleaner').sort({date: -1 });
      order.sort((a, b) => (a.status_order.name > b.status_order.name) ? 1 : ((b.status_order.name > a.status_order.name) ? -1 : 0));
    }
    if (!order.length) {
      throw new Error('У вас немає ще замовлень!');
    }
    return res.json(order);
  } catch (err) {
    res.send({ error: err.message });
  }
};

exports.getAllByAdmin = async (req, res) => {
  try {
    let order = null;
    order = await Order.find().populate('user').populate('status_order').populate('cleaner').sort({date: -1 });
    order = order.filter((el) => el.cleaner.owner == req.query.user_id);
    order.sort((a, b) => (a.status_order.name > b.status_order.name) ? 1 : ((b.status_order.name > a.status_order.name) ? -1 : 0));
    if (!order.length) {
      throw new Error('Користувачі ще нічого не замовили у ваших хімчисток!');
    }
    return res.json(order);
  } catch (err) {
    res.send({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const order = await new Order({
      cost: req.body.cost,
      status_order: 1,
      user: ObjectId(req.body.user_id),
      cleaner: ObjectId(req.body.cleaner_id),
      service: req.body.service,
      fullname: req.body.fullname,
      date: new Date(),
    }).save();
    return res.status(200).send({ message: 'Замовлення в обробці!', id: order._id });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const order = await Order.findById(ObjectId(req.body._id));
    if (!order) {
      return res.status(500).send({ message: 'Замовлення не знайдено.' });
    }
    if (req.body.fullname) order.fullname = req.body.fullname; 
    if (req.body.service) order.service = req.body.service; 
    if (req.body.cost) order.cost = req.body.cost; 
    if (req.body.date) order.date = req.body.date; 
    if (req.body.description) order.description = req.body.description; 
    if (req.body.status) {
      const status = await StatusOrder.findOne({name: req.body.status});
      order.status_order = status._id;
    } 
    order.save();
    return res.send({ message: 'Замовлення успішно оновлено!' });
  }catch(err) {
    res.status(500).send({ message: err.message });
  }
};

exports.closeOrder = async (req, res) => {
  try {
    const order = await Order.findById(ObjectId(req.query.id));
    if (!order) {
      return res.status(500).send({ message: 'Замовлення не знайдено.' });
    }
    order.isEnabled = false; 
    order.status_order = 4; 
    order.save();
    return res.send({ message: 'Замовлення успішно закрито!' });
  }catch(err) {
    res.send({ message: err.message });
  }
};
