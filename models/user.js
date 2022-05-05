const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  shoppingList: {
    recipes: [
      {
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
            weight: { type: Number },
          },
        ],
      },
    ],
  },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
