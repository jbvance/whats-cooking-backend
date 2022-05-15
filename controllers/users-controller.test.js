const request = require('supertest');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { app, runServer, closeServer } = require('../app');
const User = require('../models/user');

let hashedPassword;

describe('Auth endpoints', function () {
  const email = 'exampleuser@test.com';
  const password = 'examplePass';
  const name = 'Test User';
  const id = mongoose.Types.ObjectId();

  beforeAll(async function () {
    await runServer();
  });

  afterAll(async function () {
    await closeServer();
  });

  beforeEach(async function () {
    hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      email,
      password: hashedPassword,
      name,
      _id: id,
    });
  });

  afterEach(async function () {
    await User.remove();
  });

  it('rejects login with invalid credentials', async function () {
    const response = await request(app)
      .post('/api/users/login')
      .send({ email: 'BadUser', password: 'password123' })
      .set('Accept', 'application/json');
    expect(response.status).toEqual(401);
    expect(response.body.message).toContain('Invalid credentials');
  });

  it('should not create a new user with a duplicate email', async function () {
    const response = await request(app)
      .post('/api/users/signup')
      .send({ name, email, password })
      .set('Accept', 'application/json');
    expect(response.status).toEqual(422);
    expect(response.body.message).toContain('exists already');
  });

  it('should return a valid auth token when creating new user', async function () {
    const response = await request(app)
      .post('/api/users/signup')
      .send({
        name: 'John Doe',
        email: 'NewUser@test.com',
        password: 'password123478979',
      })
      .set('Accept', 'application/json');
    expect(response.status).toEqual(201);
    const { token } = response.body;
    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
    const decoded = jwt.decode(token);
    expect(decoded.email).toBeDefined();
    expect(decoded.email).toEqual('newuser@test.com');
  });

  it('should return a valid auth token when logging in', async function () {
    const response = await request(app)
      .post('/api/users/login')
      .send({ email, password })
      .set('Accept', 'application/json');
    console.log(response.body);
    expect(response.status).toEqual(200);
    const { token } = response.body;
    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
    const decoded = jwt.decode(token);
    expect(decoded.email).toBeDefined();
    expect(decoded.email).toEqual(email.toLowerCase());
  });
});
