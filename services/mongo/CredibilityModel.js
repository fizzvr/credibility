const mongoose = require('mongoose');

const CatCredibility = new mongoose.Schema(
  {
    fecha: { type: Date, default: Date.now },
    credibility: {
      type: String,
      default: 'NA'
    }
  },
  { versionKey: false }
);

const Credibility = mongoose.model('cat_credibility', CatCredibility);

module.exports = Credibility;
