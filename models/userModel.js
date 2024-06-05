const db = require('./db');

const User = {
  register: (userData, callback) => {
    const { firstName, lastName, role, username, password } = userData;
    const sql = 'INSERT INTO User (FirstName, LastName, Role, Username, Password) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [firstName, lastName, role, username, password], callback);
  },

  login: (username, password, role, callback) => {
    const sql = 'SELECT * FROM User WHERE Username = ? AND Password = ? AND Role = ?';
    db.query(sql, [username, password, role], callback);
  }
};

module.exports = User;
