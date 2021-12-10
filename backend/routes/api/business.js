const asyncHandler = require("express-async-handler");
const createHttpError = require("http-errors");
const express = require("express");
const { check, query } = require("express-validator");
const { Op } = require("sequelize");

const { Business, Review, User } = require("../../db/models");
const {
  handleValidationErrors,
  sanitizePaginationQuery,
} = require("../../utils/validation");
const { requireAuth } = require("../../utils/auth");
const { validateReview } = require("./reviews");

const router = express.Router();

const sanitizeBusinessSearchQuery = [query("find_desc")];

router.get(
  "/",
  sanitizePaginationQuery,
  sanitizeBusinessSearchQuery,
  asyncHandler(async (req, res) => {
    const { find_desc, limit, page } = req.query;
    const offset = page * limit;

    const businesses = await Business.findAllWithSummary({
      limit: limit,
      offset,
      where: find_desc
        ? {
            name: find_desc
              ? {
                  [Op.iLike]: `%${find_desc}%`,
                }
              : undefined,
          }
        : undefined,
    });

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

    const reviewSummary = await Review.getBusinessReviewSummary(businessId);

    return res.json({
      ...business,
      ratingAverage: reviewSummary.ratingAverage,
      total: reviewSummary.total,
    });
  })
);

const validateBusiness = [
  check("name").trim().exists({ checkFalsy: true }).withMessage("Enter a name"),
  check("description").trim().optional({ checkFalsy: true }),
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
    .optional({ checkFalsy: true })
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
  sanitizePaginationQuery,
  asyncHandler(async (req, res) => {
    const { businessId } = req.params;

    const business = await Business.findByPk(businessId);

    if (!business) {
      throw createHttpError(404);
    }

    const { limit, page } = req.query;
    const offset = page * limit;

    const reviewSummary = await Review.getBusinessReviewSummary(businessId);

    const reviews = await Review.findAll({
      where: { businessId },
      include: [{ model: User, as: "user" }],
      limit,
      offset,
    });

    return res.json({
      reviews,
      ratingAverage: reviewSummary.ratingAverage,
      total: reviewSummary.total,
    });
  })
);

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
      ratingAverage: reviewSummary.ratingAverage,
      total: reviewSummary.total,
    });
  })
);

module.exports = {
  businessesRouter: router,
};
