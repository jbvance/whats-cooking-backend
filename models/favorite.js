const mongoose = require('mongoose');
const { recipeSchema } = require('./recipeSchema');

const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
  ...recipeSchema,
  creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
});

console.log('RECIPE SCHEMA', recipeSchema);
module.exports = mongoose.model('Favorite', favoriteSchema);
