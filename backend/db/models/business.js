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
   * @param {Object} [options]
   * @returns All businesses in a raw object with review summaries included
   */
  Business.findAllWithSummary = function (options) {
    return Business.findAll({
      ...options,
      include: [
        {
          model: sequelize.models.Review,
          as: "reviews",
          attributes: [],
        },
      ],
      attributes: {
        include: [
          [
            sequelize.cast(
              sequelize.fn(
                "COALESCE",
                sequelize.fn("AVG", sequelize.col("rating")),
                0
              ),
              "float"
            ),
            "ratingAverage",
          ],
          [
            sequelize.cast(
              sequelize.fn("COUNT", sequelize.col("rating")),

              "int"
            ),
            "total",
          ],
        ],
      },
      group: ["Business.id"],
    });
  };

  return Business;
};
