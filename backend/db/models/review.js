"use strict";

module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(
    "Review",
    {
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      businessId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      rating: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      comment: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
    },
    {}
  );

  Review.associate = function (models) {
    Review.belongsTo(models.Business, {
      as: "business",
      foreignKey: "businessId",
    });
    Review.belongsTo(models.User, {
      as: "user",
      foreignKey: "userId",
    });
  };

  Review.getBusinessReviewSummary = async function (businessId) {
    const review = await Review.findOne({
      attributes: [
        [sequelize.fn("AVG", sequelize.col("rating")), "ratingAverage"],
        [sequelize.fn("COUNT", sequelize.col("rating")), "total"],
      ],
      where: {
        businessId,
      },
      raw: true,
    });

    return {
      ratingAverage: parseFloat(review.ratingAverage) || 0,
      total: parseInt(review.total, 10) || 0,
    };
  };

  return Review;
};
