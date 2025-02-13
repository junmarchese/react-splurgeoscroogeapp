const request = require('supertest');
const app = require('../server');
const { User } = require('../src/models');

describe('Auth Integration Tests', () => {
  beforeEach(async () => {
    await User.destroy({ where: {} }); // Clear users before each test
  });

  it('should create a user and allow login', async () => {
    // Signup
    const signupResponse = await request(app)
      .post('/api/auth/signup')
      .send({
        username: 'testuser',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com'
      });

    expect(signupResponse.status).toBe(201);
    expect(signupResponse.body).toHaveProperty('token');

    // Login
    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'testuser',
        password: 'password123'
      });

    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body).toHaveProperty('token');
  });
});
