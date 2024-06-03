const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ecommerce_system'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});

// Test postman register
/*
 http://localhost:3001/users/register
 Method: POST
 Body: JSON
 {
  "firstName": "John",
  "lastName": "Doe",
  "role": "customer",
  "username": "johndoe",
  "password": "password123"
}
*/

exports.register = (req, res) => {
  const { firstName, lastName, role, username, password } = req.body;

  const sql = 'INSERT INTO User (FirstName, LastName, Role, Username, Password) VALUES (?, ?, ?, ?, ?)';
  connection.query(sql, [firstName, lastName, role, username, password], (err, result) => {
    if (err) {
      console.error('Error registering user:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.status(200).send('OK');
  });
};

// Test postman login
/*
 http://localhost:3001/users/login
 Method: POST
 Body: JSON
{
  "username": "johndoe",
  "password": "password123",
  "role": "customer"
}
*/
exports.login = (req, res) => {
  const { username, password, role } = req.body;

  const sql = 'SELECT * FROM User WHERE Username = ? AND Password = ? AND Role = ?';
  connection.query(sql, [username, password, role], (err, results) => {
    if (err) {
      console.error('Error logging in:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    if (results.length === 0) {
      res.status(401).send('Invalid credentials');
      return;
    }

    res.status(200).send('OK');
  });
};
