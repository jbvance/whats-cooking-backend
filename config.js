'use strict';
let databaseUrl = '';
if (process.env.NODE_ENV === 'test') {
  databaseUrl = global.__MONGO_URI__;
} else {
  databaseUrl = process.env.DB_URL;
}
// exports.DATABASE_URL =
//     process.env.DATABASE_URL ||
//     global.DATABASE_URL ||
//     'mongodb://localhost/jwt-auth-demo';
exports.DB_URL = databaseUrl;
exports.PORT = process.env.PORT || 8080;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';
