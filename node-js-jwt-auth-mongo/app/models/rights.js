const mongoose = require('mongoose');

const rightSchema = new mongoose.Schema({
  _id: Number,
  name: { type: String, required: true },
}, { collection: 'rights' });

module.exports = mongoose.model('Right', rightSchema);