const HttpError = require('../models/http-error');
const User = require('../models/user');
const Favorite = require('../models/favorite');
const mongoose = require('mongoose');
//const { request } = require('http');

/********************************
 * GET FAVORITES
 *******************************/
const getFavorites = async (req, res, next) => {
  // check for an existing user
  let user;
  try {
    user = await User.findById(req.userData.userId);
  } catch (err) {
    const error = new HttpError(
      'Creating favorite failed, please try again.',
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError('Could not find user for provided id.', 404);
    return next(error);
  }
  let userWithFavorites;
  try {
    userWithFavorites = await User.findById(req.userData.userId).populate(
      'favorites'
    );
  } catch (err) {
    console.log(err);
    const error = new HttpError('Error finding favorites for user id', 500);
    return next(error);
  }

  if (
    !userWithFavorites ||
    !userWithFavorites.favorites ||
    userWithFavorites.favorites.length === 0
  ) {
    const error = new HttpError(
      'Could not find any favorites for the provided user id',
      404
    );
    return next(error);
  }
  res.json({
    favorites: userWithFavorites.favorites.map((fav) =>
      fav.toObject({ getters: true })
    ),
  });
};

/***********************************************
 * CREATE A NEW Favorite
 **********************************************/
const createFavorite = async (req, res, next) => {
  const recipe = req.body;
  console.log('BODY', req.body);

  const createdFavorite = new Favorite({
    ...recipe,
    creator: req.userData.userId, // this is added in checkAuth middleware
  });

  // check for an existing user
  let user;
  try {
    user = await User.findById(req.userData.userId);
  } catch (err) {
    const error = new HttpError(
      'Creating favorite failed, please try again.',
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
    await createdFavorite.save({ session: sess });
    user.favorites.push(createdFavorite);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      'Creating favorite failed, please try again',
      500
    );
    return next(error);
  }

  // created successfully
  res.status(201).json({ data: createdFavorite.toObject({ getters: true }) });
};

exports.getFavorites = getFavorites;
exports.createFavorite = createFavorite;
