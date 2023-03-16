const express = require("express");
const app = express();
const cluster = require("node:cluster");
const numCPUs = require("node:os");
const process = require("node:process");
const cors = require("cors");
const morgan = require("morgan");
const { default: helmet } = require("helmet");
const compression = require("compression");
const { dbConfig } = require("./utils/db");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const validDomains = ["https://www.zetsy.store", "https://zetsy.store"];

app
  .use(morgan("dev"))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(helmet())
  .use(compression());

const PORT = process.env.PORT || 4000;

/**
 * @dev configuration utils
 * 1. Database Configuration
 */
dbConfig();

/**
 * @dev Router Configuration
 */

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.listen(PORT, () => {
  console.log(`👾 : Server listening on ${PORT}!`);
});

app.use(
  cors({
    origin: process.env.NODE_ENV === "DEVELOPMENT" ? "*" : validDomains,
  })
)

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  console.log(`Worker ${process.pid} started`);
}

app
  .get("/", (req, res) => {
    res.status(200).json({ message: "welcome to zetsy api" });
  })
  .get("*", (req, res) => {
    res.status(404).json({
      msg: "404 Not Found! 🦟",
    });
  });
