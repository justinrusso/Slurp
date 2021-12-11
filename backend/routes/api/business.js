const asyncHandler = require("express-async-handler");
const createHttpError = require("http-errors");
const express = require("express");
const { Client } = require("@googlemaps/google-maps-services-js");
const { check, validationResult } = require("express-validator");

const { Business, Review, User } = require("../../db/models");
const {
  apiKeys: { google: googleApiKey },
} = require("../../config");
const { handleValidationErrors } = require("../../utils/validation");
const { requireAuth } = require("../../utils/auth");
const { validateReview } = require("./reviews");

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const businesses = await Business.findAllWithSummary();

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

const client = new Client();
const addressToLatLong = asyncHandler(async (req) => {
  // If the lat and long are passed in the body, skip requesting the information from Google
  if (req.body.lat && req.body.long) {
    return { lat: req.body.lat, long: req.body.long };
  }

  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    return;
  }

  const { address, city, state, zipCode } = req.body;

  const geocodeResult = await client.geocode({
    params: {
      address: `${address}, ${city}, ${state} ${zipCode}`,
      key: googleApiKey,
    },
  });

  if (
    !geocodeResult.data ||
    geocodeResult.data.status !== "OK" ||
    !geocodeResult.data.results ||
    geocodeResult.data.results.length < 1
  ) {
    return;
  }

  return {
    lat: geocodeResult.data.results[0].geometry.location.lat,
    long: geocodeResult.data.results[0].geometry.location.lng,
  };
});

const validateBusiness = [
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
  check("address").custom(async (_, { req }) => {
    try {
      const latLong = await addressToLatLong(req);

      if (!latLong) {
        throw new Error("Failed to find this address. Try again.");
      }

      req.body.lat = latLong.lat;
      req.body.long = latLong.long;
      return true;
    } catch {
      throw new Error("Failed to find this address. Try again.");
    }
  }),

  check("name").trim().exists({ checkFalsy: true }).withMessage("Enter a name"),
  check("description").trim().optional({ checkFalsy: true }),
  check("displayImage")
    .trim()
    .optional({ checkFalsy: true })
    .isURL()
    .withMessage("Enter a valid image url"),
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
