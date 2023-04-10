const User = require("../models/user"),
  bcrypt = require("bcrypt"),
  jwt = require("jsonwebtoken"),
  RefreshToken = require("../models/refreshToken"),
  nodemailer = require("nodemailer"),
  crypto = require("crypto");

module.exports = {
  loginUser: async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Email does not exists in the DB." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect email or password." });
    }

    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    await new RefreshToken({ token: refreshToken }).save();

    res.json({ accessToken, refreshToken, user });
  },
  logoutUser: async (req, res) => {
    const refreshToken = req.body.token;
    await RefreshToken.findOneAndDelete({ token: refreshToken });
    res.sendStatus(204);
  },
  registerUser: async (req, res) => {
    try {
      // Get the user input from the request body
      const { email, password } = req.body;

      // Check if the user already exists in the database
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Hash the user's password before storing it in the database
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create a new user object and save it to the database
      const newUser = new User({ email, password: hashedPassword });
      const savedUser = await newUser.save();

      res.status(201).json(savedUser);

      // Return the newly created user object to the client
      const verificationToken = jwt.sign(
        { userId: savedUser._id },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );

      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PASSWORD,
          },
        });

        const mailOptions = {
          from: "no-reply@zetsy.store", // replace with your email
          to: email,
          subject: "Verify your email",
          html: `<html>
          <head>
              <style>
                  /* Add your custom styles here */
              </style>
          </head>
          <body>
              <div style="background-color: #f8f8f8; padding: 20px;">
                  <h1>Welcome to Zetsy!</h1>
                  <p>Thank you for registering with us. Please click the link below to verify your account:</p>
                  <a href="http://localhost:3000/api/v1/auth/verify-email?token=${verificationToken}" style="background-color: #4CAF50; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer;">Verify Account</a>
                  <p>If you did not sign up for this account, please ignore this email.</p>
              </div>
          </body>
      </html>`,
        };

        await transporter.sendMail(mailOptions);
        console.log(`Verification email sent to ${email}`);
      } catch (error) {
        console.error(`Error sending verification email to ${email}: ${error}`);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  },
  forgotPassword: async (req, res) => {
    try {
      // Get the user input from the request body
      const { email } = req.body;

      // Check if the user exists in the database
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Generate a password reset token and save it to the user's document
      const token = crypto.randomBytes(20).toString("hex");
      user.passwordResetToken = token;
      user.passwordResetExpires = Date.now() + 3600000; // Token expires in 1 hour
      await user.save();

      // Send a password reset email to the user
      const transporter = nodemailer.createTransport({
        // Replace with your SMTP server configuration
        host: "smtp.example.com",
        port: 587,
        secure: false,
        auth: {
          user: "your-smtp-username",
          pass: "your-smtp-password",
        },
      });

      const mailOptions = {
        from: "Your Name <your-email@example.com>",
        to: email,
        subject: "Password Reset Request",
        html: `
            <p>You have requested a password reset. Please click on the following link to reset your password:</p>
            <a href="http://localhost:3000/reset-password/${token}">http://localhost:3000/reset-password/${token}</a>
            <p>If you did not request this reset, please ignore this email and your password will remain unchanged.</p>
          `,
      };

      await transporter.sendMail(mailOptions);

      res.status(200).json({ message: "Password reset email sent" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  },
  resetPassword: async (req, res) => {
    try {
      // Get the user input from the request body
      const { token, password } = req.body;

      // Find the user by the password reset token and check if the token has expired
      const user = await User.findOne({
        passwordResetToken: token,
        passwordResetExpires: { $gt: Date.now() },
      });
      if (!user) {
        return res.status(400).json({ message: "Invalid or expired token" });
      }

      // Hash the new password and save it to the user's document
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save();

      res.json({ message: "Password reset successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  },
  verifyUser: async (req, res) => {
    try {
      const { token } = req.query;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      await User.findByIdAndUpdate(decoded.userId, { verified: true });
      res.status(200).send("User verified successfully!");
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  },
};
