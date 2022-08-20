/**
 * @middleware this file will contain all the custom middleware functions
 * that will be used in the application.
 * Middleware is a function that receives three parameters:
 * request, response and next.
 * The middleware function is responsible for performing some action and then calling the next middleware function,
 * or the final handler function if there are no more middleware functions to call.
 * The middleware function can also call next with an error to stop the request and return an error to the client.
 * The middleware function can also call next with no parameters to skip the remaining middleware functions and continue the request to the final handler function.
 * The middleware function can also call next with a value to pass the value to the next middleware function.
 * The next function yields control to the next middleware.
 */
const logger = require("./logger");
const jwt = require("jsonwebtoken");


/**
 * this middleware will be used after all routes are defined
 * The middleware will be used to handle any unknown routes (APIs)
 * so theres no need to define next.
 */
const unknownEndpoint = (request, response) => {
  response.status(404).json({ error: "unknown endpoint" });
};

/**
 * this middleware will access the error that we pass to it
 * from the endpoints and will return the corresponding message to the client.
 * The error that is passed forwards is given to the next function as a parameter.
 * If next was called without a parameter, then the execution would simply
 * move onto the next route or middleware. If the next function is called
 * with a parameter, then the execution will continue to the error handler middleware.
 */
const errorHandler = (error, request, response, next) => {
  if (error.name === "CastError") {
    return response.status(400).send({ error: "invalid id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({
      error: "invalid token",
    });
  } else if (error.name === "TypeError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "Error") {
    return response.status(400).json({
      error: "password is required",
    });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({
      error: "token expired",
    });
  } else if (error.name === "SyntaxError") {
    return response.status(400).json({
      error: "invalid json",
    });
  }

  next(error); // if error is not handled, move to default express error handler middleware
};


// extract token from authorization header and make it available using request.token
const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    request.token = authorization.substring(7);
  }
  next();
};

// extract user from authorization header and make it available using request.userId
const userExtractor = (request, response, next) => {
  const token = request.token;
  if (token) {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    const userId = decodedToken.id;
    request.userId = userId;
  }
  next();
};

module.exports = {
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
