const Product = require("../models/product");
module.exports = {
  addProduct: async (req, res) => {
    const data = req.body;
    const product = await Product.create(data);
    res.status(201).json(product);
  },
};
