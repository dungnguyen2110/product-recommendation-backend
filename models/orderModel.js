const db = require('./db');

const Order = {
  getAll: (callback) => {
    db.query('SELECT * FROM `Order`', callback);
  },

  create: (order, callback) => {
    db.query('INSERT INTO `Order` SET ?', order, callback);
  },

  update: (id, order, callback) => {
    db.query('UPDATE `Order` SET ? WHERE OrderID = ?', [order, id], callback);
  },

  delete: (id, callback) => {
    db.query('DELETE FROM `Order` WHERE OrderID = ?', id, callback);
  }
};

module.exports = Order;
