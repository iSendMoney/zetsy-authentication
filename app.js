const { authenticateToken } = require("./middlewares/protected");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const hpp = require("hpp");
// const csurf = require("csurf");
const { default: mongoose } = require("mongoose");
const AuthenticationRouter = require("./routes/auth");
const ProductRouter = require("./routes/product");
require('dotenv').config()
const limiter = rateLimit({
  // @note need to determine how many request per minute might be there in our platform and thus set the limit
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later",
});

app
  .use(express.json())
  .use(morgan("dev"))
  .use(cors())
  .use(limiter)
  .use(helmet())
  .use(hpp());
// .use(csurf());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app
  .use("/protected", authenticateToken, (req, res) => {
    res.send("This route is protected!");
  })
  .use("/api/v1/auth", AuthenticationRouter)
  .use("/api/v1/product", ProductRouter)
  .use("*", (req, res) => {
    res.status(404).send("Not Found");
  });

module.exports = app;
