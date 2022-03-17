const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  cost: { type: Number, required: true },
  status_order: { type: Number, ref: 'StatusOrder' },
  fullname: { type: String },
  user: { type: mongoose.Types.ObjectId, ref: 'User' },
  cleaner: { type: mongoose.Types.ObjectId, ref: 'Cleaner' },
  service: { type: String, },
  date: { type: Date, },
  description: { type: String, },
  isEnabled: { type: Boolean, default: true },
}, { collection: 'order' });

module.exports = mongoose.model('Order', orderSchema);