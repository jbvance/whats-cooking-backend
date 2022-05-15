const fs = require('fs');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const mongoose = require('mongoose');
//const PORT = process.env.PORT || 5000;

//const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');
const shoppingListRoutes = require('./routes/shopping-list-routes');
const favoritesRoutes = require('./routes/favorites-routes');
const HttpError = require('./models/http-error');
let { PORT, DB_URL } = require('./config');

const app = express();

app.use(bodyParser.json());

app.use('/uploads/images', express.static(path.join('uploads', 'images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});

app.use('/api/users', usersRoutes);
app.use('/api/shopping-list', shoppingListRoutes);
app.use('/api/favorites', favoritesRoutes);

// Health check url for github actions
app.use('/healthcheck', (req, res, next) => {
  res.status(200).json({ message: 'Health Check call successful!' });
});

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route', 404);
  next(error);
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred.' });
});

let server;

function runServer() {
  return new Promise((resolve, reject) => {
    mongoose.connect(DB_URL, { useNewUrlParser: true }, (err) => {
      if (err) {
        return reject(err);
      }
      server = app
        .listen(PORT, () => {
          console.log(`Your app is listening on port ${PORT}`);
          resolve();
        })
        .on('error', (err) => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close((err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  console.log('MAIN === MODULE');
  runServer().catch((err) => console.error(err));
}

module.exports = { app, runServer, closeServer };
