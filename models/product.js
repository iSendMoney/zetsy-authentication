const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({any:{}},{strict: false});

module.exports = mongoose.model("Product", productSchema);
