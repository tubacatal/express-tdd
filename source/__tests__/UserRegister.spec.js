const request = require('supertest');
const app = require('../src/app');
const User = require('../user/User');
const sequelizeInstance = require('../config/database');

// make sure db is created before test are runned
beforeAll(() => {
  jest.setTimeout(20000);
  return sequelizeInstance.sync();
});

// clear the table before each test for predictable behaviour
beforeEach(() => {
  return User.destroy({ truncate: true });
});

describe('User Registration', () => {
  const postVaildUser = () => {
    return request(app).post('/api/1.0/users').send({
      username: 'user1',
      email: 'user1@email.com',
      password: 'P4ssword',
    });
  };

  it('returns 200 when signup request is vaild', async () => {
    const response = await postVaildUser();
    expect(response.status).toBe(200);
  });

  it('returns success message signup request is vaild', async () => {
    const response = await postVaildUser();
    expect(response.body.message).toBe('User created');
  });

  it('saves user to database', async () => {
    await postVaildUser();
    // check the database if instance exists
    const userList = await User.findAll();
    expect(userList.length).toBe(1);
  });

  it('saves the username and email to database', async () => {
    await postVaildUser();
    const userList = await User.findAll();
    const savedUser = userList[0];
    expect(savedUser.username).toBe('user1');
    expect(savedUser.email).toBe('user1@email.com');
  });

  it('hashes the password in database', async () => {
    await postVaildUser();
    const userList = await User.findAll();
    const savedUser = userList[0];
    expect(savedUser.password).not.toBe('P4ssword');
  });
});
