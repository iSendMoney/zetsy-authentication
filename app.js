const express = require("express");
const app = express();
const morgan = require("morgan");
const { default: helmet } = require("helmet");
const compression = require("compression");
const { dbConfig } = require("./utils/db");
require("dotenv").config();
const cluster = require("node:cluster");
const numCPUs = require("node:os");
const cors = require("cors");
const process = require("node:process");
const PORT = process.env.PORT || 4000;


app
  .use(morgan("dev"))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(helmet())
  .use(compression());

/**
 * @dev configuration utils
 * 1. Database Configuration
 */
dbConfig();


  
  
  app.listen(PORT, () => {
    console.log(`👾 : Server listening on ${PORT}!`);
  });
  
  const validDomains = ["https://www.zetsy.store", "https://zetsy.store"];
  
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

module.exports = app;