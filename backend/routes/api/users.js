const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");

const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");

const router = express.Router();

const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .withMessage("Enter an email")
    .isEmail()
    .withMessage("Please provide a valid email"),
  check("username")
    .exists({ checkFalsy: true })
    .withMessage("Enter a username")
    .isLength({ min: 4 })
    .withMessage("Provide a username with at least 4 characters"),
  check("username").not().isEmail().withMessage("Username cannot be an email"),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Enter a password")
    .isLength({ min: 6 })
    .withMessage("Use 6 characters or more for your password"),
  check("confirmPassword")
    .exists({ checkFalsy: true })
    .withMessage("Confirm your password")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Those passwords didn't match. Try again.");
      }
      return true;
    }),
  handleValidationErrors,
];

// Sign up
router.post(
  "/",
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;
    const user = await User.signup({ email, username, password });

    setTokenCookie(res, user);

    return res.json({
      user,
    });
  })
);

module.exports = {
  usersRouter: router,
};
