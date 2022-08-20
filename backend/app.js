const mongoose = require("mongoose");
const express = require("express");

const app = express();

const config = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");
const customerRoute = require("./controllers/customer");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const cors = require("cors");



mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connection to MongoDB:", error.message);
  });

/**
 * This middleware allow us for parsing request
 * body without it request body will be undefined.
 * takes the raw data from the requests that's stored
 * in the request object, parses it into a JavaScript
 * object and assigns it to the request object as a new property body.
 */
app.use(express.json());

/**
 * This middleware allow us for parsing request
 * body without it request body will be undefined.
 * */
app.use(cors());



/**
 * This middleware will be used to let us extract the token from the request
 */
app.use(middleware.tokenExtractor);

// routes
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/login", loginRouter);
app.use("/api/v1/customers", middleware.userExtractor, customerRoute);

// this middleware will be used to handle any unknown routes (APIs)
app.use(middleware.unknownEndpoint);

// this middleware will be used to handle any errors that APIs pass to it throw to the next function as a parameter.
app.use(middleware.errorHandler);

module.exports = app;
