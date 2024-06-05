const db = require('./db');

const Product = {
  getAll: (callback) => {
    db.query('SELECT * FROM Product', callback);
  },
  
  create: (product, callback) => {
    db.query('INSERT INTO Product SET ?', product, callback);
  },

  update: (id, product, callback) => {
    db.query('UPDATE Product SET ? WHERE productID = ?', [product, id], callback);
  },

  delete: (id, callback) => {
    db.query('DELETE FROM Product WHERE productID = ?', id, callback);
  }
};

module.exports = Product;
