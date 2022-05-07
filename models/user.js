const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { recipeSchema } = require('./recipeSchema');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  shoppingList: {
    recipes: [recipeSchema],
  },
  favorites: [
    { type: mongoose.Types.ObjectId, required: true, ref: 'Favorite' },
  ],
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
