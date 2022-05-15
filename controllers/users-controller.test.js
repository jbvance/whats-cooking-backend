const request = require('supertest');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const { app, runServer, closeServer } = require('../app');
const User = require('../models/user');
const userData = {
  name: 'Test User',
  email: 'testuser@test.com',
  password: 'password1234',
};

let newUserHashedPassword;

beforeAll(async function () {
  await runServer();
  console.log('RUN SERVER FINISHED');
  newUserHashedPassword = await bcrypt.hash(userData.password, 12);
});

afterAll(async function () {
  await closeServer();
});

describe('Auth endpoints', function () {
  const email = 'exampleUser@test.com';
  const password = 'examplePass';
  const firstName = 'Example';
  const lastName = 'User';
  const id = mongoose.Types.ObjectId();

  it('rejects login with invalid credentials', async function () {
    const s = 's';
    const response = await request(app)
      .post('/api/users/login')
      .send({ email: 'BadUser', password: 'password123' })
      .set('Accept', 'application/json');
    expect(response.status).toEqual(401);
    expect(response.body.message).toContain('Invalid credentials');
  });
});

// beforeEach(function () {
//   return User.hashPassword(password).then((password) =>
//     User.create({
//       email,
//       password,
//       firstName,
//       lastName,
//       _id: id,
//     })
//   );
// });

// afterEach(function () {
//   return User.remove({});
// });

describe('/api/auth/login', function () {
  it('Should reject requests with no credentials', function (done) {
    //console.log('RUNNING FIRST TEST');
    done();
  });
});
