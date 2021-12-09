"use strict";

const faker = require("faker");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      const businesses = await queryInterface.bulkInsert(
        "Businesses",
        newBusinesses,
        {
          returning: true,
          transaction,
        }
      );

      await Promise.all(
        businesses.map(async (business) => {
          const amountOfReviews = Math.floor(Math.random() * 11);

          const reviews = [];
          for (let i = 0; i < amountOfReviews; i++) {
            const createdAt = faker.date.past(1);
            reviews.push({
              userId: Math.floor(Math.random() * 3) + 1,
              businessId: business.id,
              rating: Math.floor(Math.random() * 5) + 1,
              comment: faker.lorem.paragraph(Math.floor(Math.random() * 4) + 1),
              createdAt,
              updatedAt: createdAt,
            });
          }

          if (reviews.length > 0) {
            await queryInterface.bulkInsert("Reviews", reviews, {
              transaction,
            });
          }
        })
      );
    });
  },

  down: async (queryInterface, Sequelize) => {
    await Promise.all(
      newBusinesses.map(async (business) => {
        await queryInterface.bulkDelete("Businesses", {
          name: business.name,
          address: business.address,
        });
      })
    );
  },
};

/*
  {
    ownerId: 2,
    name: "",
    description: "",
    displayImage: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    lat: 0,
    long: 0,
  },
*/
const newBusinesses = [
  {
    ownerId: 2,
    name: "Tonchin New York",
    description:
      "Tonchin specializes in Japanese comfort food, specifically Tokyo Tonkotsu Ramen. Other popular items include steamed buns, gyoza and a full signature cocktail bar. (Did we mention that we handmade our noodles on sight?)",
    displayImage:
      "https://s3-media0.fl.yelpcdn.com/bphoto/4OvK45jvFYpAoU8e2QfJfQ/348s.jpg",
    address: "13 W 36th Street",
    city: "New York",
    state: "NY",
    zipCode: "10018",
    lat: 40.7502694,
    long: -73.9845889,
  },
  {
    ownerId: 3,
    name: "Ramen Danbo",
    description: "Fukuoka - Style Tonkotsu Ramen All Ramen can be Vegan",
    displayImage:
      "https://s3-media0.fl.yelpcdn.com/bphoto/0tvbgvu0q6pzq4VTOfJWpQ/348s.jpg",
    address: "52 7th Ave",
    city: "Brooklyn",
    state: "NY",
    zipCode: "11217",
    lat: 40.6760944,
    long: -73.9746688,
  },
  {
    ownerId: 2,
    name: "Marufuku Ramen - New York",
    description:
      "Marufuku proudly serves the authentic Hakata-style Tonkotsu ramen — featuring milky and umami rich broth made from boiling pork bones for long hours, an ultra-thin artisanal noodles that match perfectly with the broth, and Cha-shu made from specially selected pork.Rich white chicken paitan ramen with chicken Cha-shu is also featured on the menu along with variety of mini-sized rice bowls. In a spacious area, a small group can enjoy ramen at the counter bar. A large group can also enjoy a Ramen party with great seats.",
    displayImage:
      "https://s3-media0.fl.yelpcdn.com/bphoto/Iu9mjIN-srT6iJ37oEWgGQ/348s.jpg",
    address: "92 2nd Ave",
    city: "New York",
    state: "NY",
    zipCode: "10003",
    lat: 40.7269306,
    long: -73.9888109,
  },
  {
    ownerId: 2,
    name: "Naruto Ramen",
    displayImage:
      "https://s3-media0.fl.yelpcdn.com/bphoto/NsEs73Nd3sEaPasKKL8gEg/348s.jpg",
    address: "2634 Broadway",
    city: "New York",
    state: "NY",
    zipCode: "10025",
    lat: 40.7969217,
    long: -73.9697932,
  },
  {
    ownerId: 1,
    name: "Ani Ramen House JC",
    description:
      "Ani translates to English as 'big brother'. The idea of nurturing and growth in the way that sibling and family relationships bring together and strengthen communities. Working closely with the Sun Noodle company, the Ani team tested hundreds of combinations of noodle, broth and select ingredients to define the six variations available at our location. We embraced the tradition of quality, hand-rolled noodle ramen by interpreting it in our own modern way to bring a unique and vibrant atmosphere. Our mission is to provide a relaxed and comfortable experience that you can enjoy. This all comes together as a modern, casual interpretation of our favorite Tokyo experiences, here in New Jersey. Authentic food, a real city-feel and bustling energy.",
    displayImage:
      "https://s3-media0.fl.yelpcdn.com/bphoto/QgUzRY-_Wlz3chSce3JnwA/348s.jpg",
    address: "218 Newark Ave",
    city: "Jersey City",
    state: "NJ",
    zipCode: "07302",
    lat: 40.722208,
    long: -74.0471604,
  },
  {
    ownerId: 3,
    name: "Batten Ramen",
    displayImage:
      "https://s3-media0.fl.yelpcdn.com/bphoto/U_klytvzlgjC_Lz1a1QDGg/348s.jpg",
    address: "243 Main St",
    city: "Fort Lee",
    state: "NJ",
    zipCode: "07024",
    lat: 40.8519848,
    long: -73.9720968,
  },
  {
    ownerId: 2,
    name: "Marufuku Ramen",
    displayImage:
      "https://s3-media0.fl.yelpcdn.com/bphoto/ouK2VmW0SrI70jsJpTxJhw/348s.jpg",
    address: "1581 Webster St #235",
    city: "San Francisco",
    state: "CA",
    zipCode: "94115",
    lat: 37.7851383,
    long: -122.4320928,
  },
  {
    ownerId: 3,
    name: "Iza Ramen Lower Haight",
    displayImage:
      "https://s3-media0.fl.yelpcdn.com/bphoto/c2hUqfjGL1XLsNS8uVZxsg/348s.jpg",
    address: "237 Fillmore St",
    city: "San Francisco",
    state: "CA",
    zipCode: "94117",
    lat: 37.7717883,
    long: -122.4306455,
  },
  {
    ownerId: 2,
    name: "Ramen Tatsu-Ya",
    displayImage:
      "https://s3-media0.fl.yelpcdn.com/bphoto/59OxX3sL38LdGfkNWDYkEw/348s.jpg",
    address: "1600 E 6th St",
    city: "Austin",
    state: "TX",
    zipCode: "78702",
    lat: 30.2631785,
    long: -97.7264983,
  },
];
