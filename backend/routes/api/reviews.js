const asyncHandler = require("express-async-handler");
const createHttpError = require("http-errors");
const express = require("express");
const { check } = require("express-validator");

const { Review, User } = require("../../db/models");
const { handleValidationErrors } = require("../../utils/validation");
const { requireAuth } = require("../../utils/auth.js");

const router = express.Router();

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

router.put(
  "/:reviewId(\\d+)",
  requireAuth,
  validateReview,
  asyncHandler(async (req, res) => {
    const { reviewId } = req.params;
    const review = await Review.findByPk(reviewId, {
      include: [{ model: User, as: "user" }],
    });

    if (!review) {
      throw createHttpError(404);
    }

    if (review.userId !== req.user.id) {
      throw createHttpError(403);
    }

    const { rating, comment } = req.body;

    await review.update({
      rating,
      comment,
    });

    const reviewSummary = await Review.getBusinessReviewSummary(
      review.businessId
    );

    return res.json({
      review,
      ratingAverage: parseFloat(reviewSummary.ratingAverage),
      total: parseInt(reviewSummary.total, 10),
    });
  })
);

router.delete(
  "/:reviewId(\\d+)",
  requireAuth,
  asyncHandler(async (req, res) => {
    const { reviewId } = req.params;
    const review = await Review.findByPk(reviewId);

    if (!review) {
      throw createHttpError(404);
    }

    if (review.userId !== req.user.id) {
      throw createHttpError(403);
    }

    const businessId = review.businessId;

    await review.destroy();

    const reviewSummary = await Review.getBusinessReviewSummary(businessId);

    return res.json({
      id: reviewId,
      ratingAverage: parseFloat(reviewSummary.ratingAverage),
      total: parseInt(reviewSummary.total, 10),
    });
  })
);

module.exports = {
  reviewsRouter: router,
  validateReview,
};
