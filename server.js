const app  = require('./app');
const rateLimit = require("express-rate-limit");
const { testRouter } = require('./routes/testRoutes');


/**
 * @dev Router Configuration
 */

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});


/**
 * @dev Global /api/ handler
 */
app.use("/api",apiLimiter);

app.use("/api/test", testRouter);

app
  .get("/", (req, res) => {
    res.status(200).json({ message: "welcome to zetsy api" });
  })
  .get("*", (req, res) => {
    res.status(404).json({
      msg: "404 Not Found! 🦟",
    });
  });

