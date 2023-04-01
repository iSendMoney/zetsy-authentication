module.exports = {
  authenticateToken: (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).send("Unauthorized");
    }

    jwt.verify(token, "secret", (err, user) => {
      if (err) {
        return res.status(403).send("Forbidden");
      }

      req.user = user;
      next();
    });
  },
};
