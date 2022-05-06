const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
  id: { type: String, required: true },
  label: { type: String, required: true },
  ingredients: [
    {
      food: { type: String },
      foodCategory: { type: String },
      foodId: { type: String },
      image: { type: String },
      measure: { type: String },
      quantity: { type: Number },
      text: { type: String },
      weight: { type: Number }
    }
  ],
  creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
});

module.exports = mongoose.model('Favorite', favoriteSchema);
