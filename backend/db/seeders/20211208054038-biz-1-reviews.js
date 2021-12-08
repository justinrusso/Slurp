"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Reviews",
      [
        {
          userId: 3,
          businessId: 1,
          rating: 5,
          comment:
            "Absolutely amazing. Food was excellent, price was very reasonable and service was amazing. We were greeted by two very friendly and very helpful servers as we walked in. Really attentive and a pleasure to be around.",
        },
        {
          userId: 1,
          businessId: 1,
          rating: 5,
          comment:
            "Excellent ramen w base soup. So delicious and special. I highly recommend it. Great customer service too.",
        },
        {
          userId: 1,
          businessId: 1,
          rating: 1,
          comment: "Prepare to wait 1 hour+ despite being on the waitlist.",
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      "Reviews",
      {
        userId: { [Op.in]: [1, 3] },
        businessId: 1,
      },
      {}
    );
  },
};
