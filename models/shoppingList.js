const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const shoppingListSchema = new Schema({
  recipes: [
    {
      id: { type: String, required: true },
      label: { type: String, required: true },
      calories: { type: Number },
      cautions: [{ type: String }],
      cuisineType: [{ type: String }],
      dietLabels: [{ type: String }],
      dishType: [{ type: String }],
      healthLabels: [{ type: String }],
      image: { type: String },
      images: {
        REGULAR: {
          height: { type: Number },
          width: { type: Number },
          url: { type: String },
        },
        SMALL: {
          height: { type: Number },
          width: { type: Number },
          url: { type: String },
        },
        THUMBNAIL: {
          height: { type: Number },
          width: { type: Number },
          url: { type: String },
        },
      },
      ingredientLines: [{ type: String }],
      digest: [{ type: Object }],
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
      mealType: [{ type: String }],
      shareAs: { type: String },
      source: { type: String },
      totalDaily: { type: Object },
      totalNutrients: { type: Object },
      totalTime: { type: Number },
      totalWeight: { type: Number },
      uri: { type: String },
      url: { type: String },
      creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    },
  ],
});

module.exports = mongoose.model('ShoppingList', shoppingListSchema);
