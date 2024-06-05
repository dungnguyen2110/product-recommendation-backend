const User = require('../models/userModel');

exports.register = (req, res) => {
  const newUser = req.body;

  User.register(newUser, (err, result) => {
    if (err) {
      console.error('Error registering user:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.status(200).send('User registered successfully');
  });
};

exports.login = (req, res) => {
  const { username, password, role } = req.body;

  User.login(username, password, role, (err, results) => {
    if (err) {
      console.error('Error logging in:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    if (results.length === 0) {
      res.status(401).send('Invalid credentials');
      return;
    }

    res.status(200).send('User logged in successfully');
  });
};
