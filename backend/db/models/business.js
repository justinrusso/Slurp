"use strict";

const { QueryTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Business = sequelize.define(
    "Business",
    {
      ownerId: { allowNull: false, type: DataTypes.INTEGER },
      name: { allowNull: false, type: DataTypes.STRING },
      description: { type: DataTypes.TEXT },
      address: { allowNull: false, type: DataTypes.STRING },
      city: { allowNull: false, type: DataTypes.STRING },
      state: { allowNull: false, type: DataTypes.STRING },
      zipCode: { allowNull: false, type: DataTypes.STRING },
      lat: { allowNull: false, type: DataTypes.DECIMAL },
      long: { allowNull: false, type: DataTypes.DECIMAL },
      displayImage: { type: DataTypes.STRING },
    },
    {}
  );

  Business.associate = function (models) {
    Business.hasMany(models.Review, {
      as: "reviews",
      foreignKey: "businessId",
      onDelete: "CASCADE",
    });

    Business.belongsTo(models.User, {
      as: "user",
      foreignKey: "ownerId",
    });
  };

  /**
   *
   * @returns All businesses in a raw object with review summaries included
   */
  Business.findAllWithSummary = function () {
    // Using the model to query with eager loading forces review.id to be included & breaks grouping
    return sequelize.query(
      `SELECT
        "Business"."id",
        "Business"."ownerId",
        "Business"."name",
        "Business"."description",
        "Business"."address",
        "Business"."city",
        "Business"."state",
        "Business"."zipCode",
        "Business"."lat",
        "Business"."long",
        "Business"."displayImage",
        "Business"."createdAt",
        "Business"."updatedAt",
        CAST(COALESCE(AVG("rating"), 0) AS FLOAT)  AS "ratingAverage",
        CAST(COUNT("rating") AS INT) AS "total"
      FROM "Businesses" AS "Business"
        LEFT OUTER JOIN "Reviews" AS "reviews" ON "Business"."id" = "reviews"."businessId"
      GROUP BY "Business"."id", "reviews"."businessId";`,
      { raw: true, type: QueryTypes.SELECT }
    );
  };

  return Business;
};
