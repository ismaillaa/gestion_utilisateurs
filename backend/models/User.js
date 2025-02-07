const db = require('../config/db');

const User = {
  getAll: (callback) => {
    db.all('SELECT * FROM users', callback);
  },
  getById: (id, callback) => {
    db.get('SELECT * FROM users WHERE id = ?', [id], callback);
  },
  create: (user, callback) => {
    const { name, email, age } = user;
    db.run(
      'INSERT INTO users (name, email, age) VALUES (?, ?, ?)',
      [name, email, age],
      callback
    );
  },
  update: (id, user, callback) => {
    const { name, email, age } = user;
    db.run(
      'UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?',
      [name, email, age, id],
      callback
    );
  },
  delete: (id, callback) => {
    db.run('DELETE FROM users WHERE id = ?', [id], callback);
  },
};

module.exports = User;