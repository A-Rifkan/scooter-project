const User = require('../src/User')

describe('User', () => {
  let user;
  beforeEach(() => {
    user = new User('john', 'password', 30);
  });

  it('creates a new user with the given properties', () => {
    expect(user.username).toBe('john');
    expect(user.age).toBe(30);
    expect(user.loggedIn).toBe(false);
  });

  it('logs in the user when correct password is provided', () => {
    user.login('password');
    expect(user.loggedIn).toBe(true);
  });

  it('throws error when incorrect password is provided', () => {
    expect(() => { user.login('incorrect') }).toThrowError('Incorrect password');
  });

  it('logs out the user', () => {
    user.login('password');
    user.logout();
    expect(user.loggedIn).toBe(false);
  });
});
