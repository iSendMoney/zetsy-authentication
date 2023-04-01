module.exports = {
  registerUser: async (req, res) => {
    // Use bcrypt to hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Save the user to the database
    const user = {
      id: Date.now(),
      username: req.body.username,
      password: hashedPassword,
    };
    users.push(user);

    res.status(201).send();
  },
};
