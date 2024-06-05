const Order = require('../models/orderModel');

exports.getAllOrders = (req, res) => {
  Order.getAll((err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
};

exports.createOrder = (req, res) => {
  const newOrder = req.body;
  Order.create(newOrder, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({ message: 'Order created successfully', orderId: result.insertId });
    }
  });
};

exports.updateOrder = (req, res) => {
  const id = req.params.id;
  const updatedOrder = req.body;
  Order.update(id, updatedOrder, (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({ message: 'Order updated successfully' });
    }
  });
};

exports.deleteOrder = (req, res) => {
  const id = req.params.id;
  Order.delete(id, (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({ message: 'Order deleted successfully' });
    }
  });
};
