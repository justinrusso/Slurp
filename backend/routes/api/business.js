const asyncHandler = require("express-async-handler");
const createHttpError = require("http-errors");
const express = require("express");
const { check } = require("express-validator");

const { Business, Review, User } = require("../../db/models");
const { handleValidationErrors } = require("../../utils/validation");
const { requireAuth } = require("../../utils/auth");

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

const validateBusiness = [
  check("name").trim().exists({ checkFalsy: true }).withMessage("Enter a name"),
  check("description").trim().optional(),
  check("address")
    .trim()
    .exists({ checkFalsy: true })
    .withMessage("Enter an address"),
  check("city").trim().exists({ checkFalsy: true }).withMessage("Enter a city"),
  check("state")
    .trim()
    .exists({ checkFalsy: true })
    .withMessage("Enter a state"),
  check("zipCode")
    .trim()
    .exists({ checkFalsy: true })
    .withMessage("Enter a zip code"),
  check("lat")
    .exists({ checkFalsy: true })
    .withMessage("Enter a latitude")
    .isDecimal()
    .withMessage("Enter a valid latitude"),
  check("long")
    .exists({ checkFalsy: true })
    .withMessage("Enter a longitude")
    .isDecimal()
    .withMessage("Enter a valid longitude"),
  check("displayImage")
    .trim()
    .optional()
    .isURL()
    .withMessage("Enter a valid image url"),
  handleValidationErrors,
];

router.post(
  "/",
  requireAuth,
  validateBusiness,
  asyncHandler(async (req, res) => {
    const {
      name,
      description,
      address,
      city,
      state,
      zipCode,
      lat,
      long,
      displayImage,
    } = req.body;

    const business = await Business.create({
      ownerId: req.user.id,
      name,
      description,
      address,
      city,
      state,
      zipCode,
      lat,
      long,
      displayImage,
    });

    return res.status(201).json(business);
  })
);

router.put(
  "/:businessId(\\d+)",
  requireAuth,
  validateBusiness,
  asyncHandler(async (req, res) => {
    const { businessId } = req.params;

    const business = await Business.findByPk(businessId);

    if (!business) {
      throw createHttpError(404);
    }

    const {
      name,
      description,
      address,
      city,
      state,
      zipCode,
      lat,
      long,
      displayImage,
    } = req.body;

    await business.update({
      name,
      description,
      address,
      city,
      state,
      zipCode,
      lat,
      long,
      displayImage,
    });

    return res.json(business);
  })
);

router.delete(
  "/:businessId(\\d+)",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { businessId } = req.params;

    const business = await Business.findByPk(businessId);

    if (!business) {
      throw createHttpError(404);
    }

    if (business.ownerId !== req.user.id) {
      throw createHttpError(403);
    }

    await business.destroy();

    return res.json({ id: businessId });
  })
);

router.get(
  "/:businessId(\\d+)/reviews",
  asyncHandler(async (req, res) => {
    const { businessId } = req.params;

    const business = await Business.findByPk(businessId);

    if (!business) {
      throw createHttpError(404);
    }

    const reviewSummary = await Review.getBusinessReviewSummary(businessId);

    const reviews = await Review.findAll({
      where: { businessId },
      include: [{ model: User, as: "user" }],
    });

    return res.json({
      reviews,
      ratingAverage: parseFloat(reviewSummary.ratingAverage),
      total: parseInt(reviewSummary.total, 10),
    });
  })
);

const validateReview = [
  check("rating")
    .exists({ checkFalsy: true })
    .withMessage("Enter a rating")
    .isInt()
    .withMessage("Enter a valid rating"),
  check("comment")
    .trim()
    .exists({ checkFalsy: true })
    .withMessage("Enter a comment"),
  handleValidationErrors,
];

router.post(
  "/:businessId(\\d+)/reviews",
  requireAuth,
  validateReview,
  asyncHandler(async (req, res) => {
    const { businessId } = req.params;

    const business = await Business.findByPk(businessId);

    if (!business) {
      throw createHttpError(404);
    }

    const { rating, comment } = req.body;

    let review = await Review.create({
      userId: req.user.id,
      businessId,
      rating,
      comment,
    });

    review = await Review.findByPk(review.id, {
      include: [{ model: User, as: "user" }],
    });

    const reviewSummary = await Review.getBusinessReviewSummary(businessId);

    return res.status(201).json({
      review,
      ratingAverage: parseFloat(reviewSummary.ratingAverage),
      total: parseInt(reviewSummary.total, 10),
    });
  })
);

module.exports = {
  businessesRouter: router,
};
