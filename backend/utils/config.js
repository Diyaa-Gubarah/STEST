/**
 * @file Config this file will be used to store all the configuration variables for the application.
 * we will only import 'dotenv' in this file
 * and exports the variable in '.env' file for others
 * part of the project
 */
require("dotenv").config();

const PORT = process.env.PORT;

const MONGODB_URI = process.env.MONGODB_URI;

module.exports = {
  MONGODB_URI,
  PORT,
};
