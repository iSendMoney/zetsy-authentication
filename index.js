const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
const PORT = process.env.PORT || 3000;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  const app = require("./app");
  // Worker process
  console.log(`Worker ${process.pid} started`);

  const server = app.listen(PORT, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(
        `Worker ${process.pid} started and listening on port ${
          server.address().port
        }`
      );
    }
  });
}
