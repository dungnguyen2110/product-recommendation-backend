const Product = require("../models/productModel");

exports.getAllProducts = (req, res) => {
  Product.getAll((err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
};

exports.createProduct = (req, res) => {
  const newProduct = req.body;
  Product.create(newProduct, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({
        message: "Product created successfully",
        newProduct: {
          productID: result.insertId,
          ...newProduct,
        },
      });
    }
  });
};

exports.updateProduct = (req, res) => {
  const id = req.params.id;
  const updatedProduct = req.body;
  Product.update(id, updatedProduct, (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({
        message: "Product updated successfully",
        newProduct: {
          ...updatedProduct
        },
      });
    }
  });
};

exports.deleteProduct = (req, res) => {
  const id = req.params.id;
  Product.delete(id, (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({ message: "Product deleted successfully" });
    }
  });
};

exports.getRecommendedProducts = (req, res) => {
  const { type } = req.query;
  const typeArray = type.split(',');

  Product.getAll((err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      const filteredProducts = results.filter(product => typeArray.includes(product.type));
      res.json(filteredProducts);
    }
  });
};