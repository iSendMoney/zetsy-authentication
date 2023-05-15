const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
const PORT = process.env.PORT || 3000;
const workers = {}

function spawn() {
  const worker = cluster.fork();
  workers[worker.pid] = worker;
  return worker;
}
if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
  for (let i = 0; i < numCPUs; i++) {
    spawn();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();

  });

  cluster.on('listening', function (worker, address) {
    console.log('Worker started with PID ' + worker.process.pid + '.');
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
