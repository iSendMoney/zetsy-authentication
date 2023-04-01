const Joi = require("joi");

// @note it contains lot's of data but factorize it
module.exports = {
  userRegistrationValidation: (req, res, next) => {
    const schema = Joi.object({
      username: Joi.string().alphanum().min(3).max(30).required(),
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
      repeat_password: Joi.ref("password"),
      access_token: [Joi.string(), Joi.number()],
      birth_year: Joi.number().integer().min(1900).max(2013),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
    })
      .with("username", "password")
      .xor("password", "access_token")
      .with("password", "repeat_password");

    // Validate input
    const { error, value } = schema.validate({
      username: "JohnDoe",
      password: "password123",
      repeat_password: "password123",
      birth_year: 1990,
      email: "john@doe.com",
    });

    if (error) {
      console.log(error.details);
    } else {
      console.log(value);
    }
  },
};
