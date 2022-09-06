const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

// POST /api/users
usersRouter.post("/", async (request, response, next) => {
  const { username, name, password } = request.body;

  try {
    //Check if password is at least 3 characters long
    if (password?.length < 3) {
      return response
        .status(400)
        .json({ error: "password must be at least 3 characters long" });
    }
    // Check if username is already taken
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return response.status(400).json({
        error: "username must be unique",
      });
    }

    // Hash password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      name,
      passwordHash,
    });

    const savedUser = await user.save();
    response.json(savedUser);
  } catch (error) {
    console.log(`post /api/users error: ${error}`);
    next(error);
  }
});

// GET /api/users
usersRouter.get("/", async (request, response, next) => {
  try {
    const users = await User.find({}).populate("customers", {
      name: 1,
      number: 1,
      role: 1,
    })
    response.json(users);
  } catch (error) {
    next(error);
  }
});

// GET /api/users/:id
usersRouter.get("/:id", async (request, response, next) => {
  try {
    const user = await User.findById(request.params.id);
    if (!user) {
      return response.status(404).json({ error: "user not found" });
    }
    response.json(user);
  } catch (error) {
    next(error);
  }
});

// PUT /api/users/:id
usersRouter.put("/:id", async (request, response, next) => {
  const { username, name, password } = request.body;
  try {
    const user = await User.findById(request.params.id);
    if (!user) {
      return response.status(404).json({ error: "user not found" });
    }
    if (username) {
      user.username = username;
    }
    if (name) {
      user.name = name;
    }
    if (password) {
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);
      user.passwordHash = passwordHash;
    }
    const savedUser = await user.save();
    response.json(savedUser);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/users/:id
usersRouter.delete("/:id", async (request, response, next) => {
  try {
    const user = await User.findById(request.params.id);
    if (!user) {
      return response.status(404).json({ error: "user not found" });
    }
    await user.remove();
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
