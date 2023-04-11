const express = require("express"),
  {
   addProduct
  } = require("../controllers/product");
const {authenticateToken} = require("../middlewares/protected");

const ProductRouter = express.Router();

ProductRouter.post(
  "/add",
  authenticateToken,
  addProduct
);


module.exports = ProductRouter;
