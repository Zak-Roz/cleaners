const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema({
  _id: Number,
  name: { type: String, required: true },
}, { collection: 'status_u' });

module.exports = mongoose.model('StatusUser', statusSchema);