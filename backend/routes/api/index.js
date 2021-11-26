const express = require("express");
const asyncHandler = require("express-async-handler");

const { setTokenCookie } = require("../../utils/auth.js");
const { User } = require("../../db/models");

const router = express.Router();

module.exports = {
  apiRouter: router,
};
