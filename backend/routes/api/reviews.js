const express = require("express");
const asyncHandler = require("express-async-handler");

const { requireAuth } = require("../../utils/auth.js");
const { Review, User } = require("../../db/models");
const createHttpError = require("http-errors");

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
      return createHttpError(404);
    }

    if (review.userId !== req.user.id) {
      return createHttpError(403);
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

module.exports = {
  reviewsRouter: router,
  validateReview,
};
