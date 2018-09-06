const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GenealogySchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Number,
    default: 0,
  },
  username: {
    type: String,
  },
});

GenealogySchema.index({
  '$**': 'text',
});

module.exports = mongoose.model('Genealogy', GenealogySchema);
