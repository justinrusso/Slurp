const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");

const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { User } = require("../../db/models");

const validateLogin = [
  check("credential")
    .exists({ checkFalsy: true })
    .withMessage("Enter an email or username")
    .notEmpty()
    .withMessage("Enter a valid email or username"),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Enter a password"),
  handleValidationErrors,
];

const router = express.Router();

// Restore session user
router.get("/", restoreUser, (req, res) => {
  const { user } = req;
  if (user) {
    return res.json({
      user: user.toSafeObject(),
    });
  }
  return res.json({});
});

// Demo Login
router.get(
  "/demo",
  asyncHandler(async (req, res, next) => {
    const user = await User.login({
      credential: "demo@user.io",
      password: "password",
    });

    if (!user) {
      const err = new Error("Login failed");
      err.status = 401;
      err.title = "Login failed";
      err.errors = { credentials: "The provided credentials were invalid." };
      return next(err);
    }

    setTokenCookie(res, user);

    return res.json({
      user,
    });
  })
);

// Log in
router.post(
  "/",
  validateLogin,
  asyncHandler(async (req, res, next) => {
    const { credential, password } = req.body;

    const user = await User.login({ credential, password });

    if (!user) {
      const err = new Error("Login failed");
      err.status = 401;
      err.title = "Login failed";
      err.errors = { credentials: "The provided credentials were invalid." };
      return next(err);
    }

    setTokenCookie(res, user);

    return res.json({
      user,
    });
  })
);

// Log out
router.delete("/", (_req, res) => {
  res.clearCookie("token");
  return res.json({ message: "success" });
});

module.exports = {
  sessionRouter: router,
};
