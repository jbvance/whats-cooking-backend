const mongoose = require('mongoose');
const UserModel = require('../models/user');
const userData = {
  name: 'Test User',
  email: 'testuser@test.com',
  password: 'password1234',
};

describe('User Model Test', () => {
  beforeAll(async () => {
    mongoose.connect(
      global.__MONGO_URI__,
      { useNewUrlParser: true, useCreateIndex: true },
      (err) => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
      }
    );
  });

  afterAll(() => {
    mongoose.connection.close();
  });

  it('dummy test', () => {});

  // it('create & save user successfully', async () => {
  //   const validUser = new UserModel(userData);
  //   const savedUser = await validUser.save();
  //   // Object Id should be defined when successfully saved to MongoDB.
  //   expect(savedUser._id).toBeDefined();
  //   expect(savedUser.email).toBe(userData.email);
  //   expect(savedUser.name).toBe(userData.name);
  // });

  // Test Schema is working!!!
  // You shouldn't be able to add in any field that isn't defined in the schema
  // it('insert user successfully, but the field does not defined in schema should be undefined', async () => {
  //     const userWithInvalidField = new UserModel({ name: 'TekLoon', gender: 'Male', nickname: 'Handsome TekLoon' });
  //     const savedUserWithInvalidField = await userWithInvalidField.save();
  //     expect(savedUserWithInvalidField._id).toBeDefined();
  //     expect(savedUserWithInvalidField.nickkname).toBeUndefined();
  // });

  // Test Validation is working!!!
  // It should us told us the errors in on gender field.
  // it('create user without required field should failed', async () => {
  //     const userWithoutRequiredField = new UserModel({ name: 'TekLoon' });
  //     let err;
  //     try {
  //         const savedUserWithoutRequiredField = await userWithoutRequiredField.save();
  //         error = savedUserWithoutRequiredField;
  //     } catch (error) {
  //         err = error
  //     }
  //     expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
  //     expect(err.errors.gender).toBeDefined();
  // });
});
