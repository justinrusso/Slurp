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

  Review.getBusinessAverage = async function (businessId) {
    const review = await Review.findOne({
      attributes: [[sequelize.fn("AVG", sequelize.col("rating")), "ratingAvg"]],
      where: {
        businessId,
      },
      raw: true,
    });

    return review.ratingAvg;
  };

  return Review;
};
