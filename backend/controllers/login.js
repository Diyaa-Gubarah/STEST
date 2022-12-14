const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/user");

loginRouter.post("/", async (request, response, next) => {
  const { username, password } = request.body;
  try {
    const user = await User.findOne({ username });

    if (!user || !password) {
      return response
        .status(401)
        .json({ error: "invalid username or password" });
    }

    const passwordCorrect = await bcrypt.compare(password, user.passwordHash);

    if (!passwordCorrect) {
      return response
        .status(401)
        .json({ error: "no user associated with this account." });
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    };

    /**
     * The token digitally signed using a string from the environment variable
     * SECRET as the secret. The digital signature ensures that
     *  only parties who know the secret can generate a valid token.
     *  The value for the environment variable must be set in the .env file.
     */
    const token = jwt.sign(userForToken, process.env.SECRET, {
      expiresIn: "6h", // expires in 6 hour
    });

    response
      .status(200)
      .json({ token, username: user.username, name: user.name });
  } catch (error) {
    next(error);
  }
});

module.exports = loginRouter;
