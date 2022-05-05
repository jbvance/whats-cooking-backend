const HttpError = require('../models/http-error');
const ShoppingList = require('../models/shoppingList');
const User = require('../models/user');
const mongoose = require('mongoose');
const { request } = require('http');

const getShoppingList = async (req, res, next) => {
  // check for an existing user
  let user;
  try {
    user = await User.findById(req.userData.userId);
  } catch (err) {
    const error = new HttpError(
      'Updating shopping list failed, please try again.',
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError('Could not find user for provided id.', 404);
    return next(error);
  }

  res.status(200).json({ data: user.shoppingList });
};

const updateShoppingList = async (req, res, next) => {
  const { shoppingList } = req.body;

  // check for an existing user
  let user;
  try {
    user = await User.findById(req.userData.userId);
  } catch (err) {
    const error = new HttpError(
      'Updating shopping list failed, please try again.',
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError('Could not find user for provided id.', 404);
    return next(error);
  }

  try {
    // use a session and transaction to roll back in case one of the operations fails
    const sess = await mongoose.startSession();
    sess.startTransaction();
    //await createdPlace.save({ session: sess });
    //user.places.push(createdPlace);
    user.shoppingList = shoppingList;
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      'Updating shopping list failed, please try again',
      500
    );
    return next(error);
  }

  // created successfully
  res.status(201).json({ message: 'Shopping List updated successfully' });
};

exports.updateShoppingList = updateShoppingList;
exports.getShoppingList = getShoppingList;
