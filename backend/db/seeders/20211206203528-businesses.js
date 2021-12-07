"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Businesses",
      [
        {
          ownerId: 2,
          name: "Ramen Nagomi",
          description: `Ramen Nagomi focuses on creating unique, flavorful Japanese ramen from scratch, highlighting organic and premium quality ingredients from Japan. Following a Japanese philosophy of cooking with an appetite for innovation, we have crafted a variety of broths to satisfy everyone's palette and craving. The Ramen Nagomi goal is to live up to our name, "Nagomi," a Japanese character that means comfort, harmony and "Japan." We are proud to serve Japanese comfort food to all of our guests.`,
          address: "49 Bayard Street",
          city: "New Brunswick",
          state: "NJ",
          zipCode: "08907",
          lat: "40.4943633",
          long: "-74.4446811",
          displayImage:
            "https://s3-media0.fl.yelpcdn.com/bphoto/q_-snpHnD_W93a4sPdzHMA/348s.jpg",
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(
      "Businesses",
      {
        name: "Ramen Nagomi",
        address: "49 Bayard Street",
      },
      {}
    );
  },
};
