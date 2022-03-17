const mongoose = require('mongoose');

const cleanerSchema = new mongoose.Schema({
  title: { type: String, },
  description: { type: String, },
  owner: { type: mongoose.Types.ObjectId, ref: 'User' },
  services: [{ type: Map, of: new mongoose.Schema({
    name: { type: String, },
    cost: { type: Number, },
  }) }],
  images: [{ type: String, }],
}, { collection: 'cleaners' });

module.exports = mongoose.model('Cleaner', cleanerSchema);