// @note it contains lot's of data but factorize it
module.exports = {
  authenticationInputValidation: (req, res, next) => {
    const {social} = req.query
    const { email, password } = req.body;
    console.log(email)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValidEmail = emailRegex.test(email);
    if (!isValidEmail) {
      return res.status(400).json({
        message: "Invalid email"
      });
    }
    // do not validate password if it is social authentication
    if(!social){
      const passwordRegex =
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      const isValidPassword = passwordRegex.test(password);
      if (!isValidPassword) {
        return res.status(400).json({
          message: "Invalid password"
        });
      }
    }
    next();
  },
};
