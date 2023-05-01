const jwt = require("jsonwebtoken");
module.exports = {
  authenticateToken: (req, res, next) => {
    const authHeader = req.headers["authorization"];
    let token;
    if(authHeader && authHeader.startsWith("Bearer")){
      token = authHeader.split(" ")[1];
    }else{
      token = authHeader.split(" ")[0];
    }
    console.log(token)
    if (!token) {
      return res.status(401).send("Unauthorized");
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).send("Forbidden");
      }

      req.user = user;
      next();
    });
  },
};
