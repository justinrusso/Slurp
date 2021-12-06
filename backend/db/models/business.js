"use strict";
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
    Business.belongsTo(models.User, {
      as: "user",
      foreignKey: "ownerId",
    });
  };
  return Business;
};
