const express = require("express");
const asyncHandler = require("express-async-handler");

const { sessionRouter } = require("./session");
const { setTokenCookie } = require("../../utils/auth.js");
const { User } = require("../../db/models");
const { usersRouter } = require("./users");
const { businessesRouter } = require("./business");

const router = express.Router();

router.use("/businesses", businessesRouter);
router.use("/session", sessionRouter);
router.use("/users", usersRouter);

module.exports = {
  apiRouter: router,
};
