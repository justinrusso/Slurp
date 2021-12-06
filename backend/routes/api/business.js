const express = require("express");
const createHttpError = require("http-errors");
const asyncHandler = require("express-async-handler");

const { Business } = require("../../db/models");

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const businesses = await Business.findAll();

    return res.json(businesses);
  })
);

router.get(
  "/:businessId(\\d+)",
  asyncHandler(async (req, res) => {
    const { businessId } = req.params;

    const business = await Business.findByPk(businessId);

    if (!business) {
      throw createHttpError(404);
    }

    return res.json(business);
  })
);

module.exports = {
  businessesRouter: router,
};
