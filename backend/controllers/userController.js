const User = require('../models/User');

const userController = {
  getAllUsers: (req, res) => {
    User.getAll((err, users) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(users);
    });
  },
  getUserById: (req, res) => {
    const id = req.params.id;
    User.getById(id, (err, user) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.json(user);
    });
  },
  createUser: (req, res) => {
    const newUser = req.body;
    User.create(newUser, function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'User created', id: this.lastID });
    });
  },
  updateUser: (req, res) => {
    const id = req.params.id;
    const updatedUser = req.body;
    User.update(id, updatedUser, (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'User updated' });
    });
  },
  deleteUser: (req, res) => {
    const id = req.params.id;
    User.delete(id, (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'User deleted' });
    });
  },
};

module.exports = userController;