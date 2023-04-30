const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');
const User = require('../models/user');
const bcrypt = require('bcrypt');

require("dotenv").config();
const mockUser = {
  email: "test@example.com",
  password: "123456"
}

beforeAll(async () => {
  await mongoose.connect(process.env.DB_HOST);
  const { email, password } = mockUser;
  const user = await User.findOne({ email: email });
  if (!user) {
    const hashPassword = await bcrypt.hash(password, 10);
    await User.create({ ...mockUser, password: hashPassword, avatarURL: '/test/path' });
  }
})

afterAll(async () => {
  await User.findOneAndRemove({ email: mockUser.email });
  await mongoose.connection.close();
})

describe('Ligin Controller', () => {

  test('Login should return Token', async () => {
    const res = await request(app).post("/api/auth/login").send({ ...mockUser });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  }, 10000)

  test('Login should return Token', async () => {
    const res = await request(app).post("/api/auth/login").send({ ...mockUser });

    expect(res.body).toHaveProperty('token');
    expect(res.body).toEqual(expect.objectContaining({
      token: expect.any(String),
    }))
  }, 10000);

  test('Login should return User object', async () => {
    const res = await request(app).post("/api/auth/login").send({ ...mockUser });

    expect(res.body).toHaveProperty('user');
    expect(res.body.user).toEqual(expect.objectContaining({
      email: expect.any(String),
      subscription: expect.any(String)
    }))
  }, 10000)
})






