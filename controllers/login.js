module.exports = {
  loginUser: async (req, res) => {
    // Find the user in the database
    const user = users.find((u) => u.username === req.body.username);
    if (!user) {
      return res.status(400).send("Invalid username or password");
    }

    // Compare the password hash with the provided password
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      return res.status(400).send("Invalid username or password");
    }

    // Create a JWT token for the user
    const token = jwt.sign({ username: user.username }, "secret");

    res.json({ token });
  },
};
