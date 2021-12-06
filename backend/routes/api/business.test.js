const request = require("supertest");
const app = require("../../app.js");
const db = require("../../db/models");

const makeRoute = (childRoute) => {
  return `/api/businesses${childRoute}`;
};

describe("Businesses API route", () => {
  beforeAll(async () => {
    await db.sequelize.authenticate();
  });

  afterAll(async () => {
    await db.sequelize.close();
  });

  describe("/:businessId", () => {
    test("responds to a GET request", async () => {
      const response = await request(app).get(makeRoute("/1"));
      expect(response.statusCode).toBe(200);
    });

    test("responds with a business object", async () => {
      const response = await request(app).get(makeRoute("/1"));
      const body = response.body;

      expect(body).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          ownerId: expect.any(Number),
          name: expect.any(String),
          description: expect.any(String),
          address: expect.any(String),
          city: expect.any(String),
          state: expect.any(String),
          zipCode: expect.any(String),
          lat: expect.any(String),
          long: expect.any(String),
          displayImage: expect.any(String),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        })
      );
    });

    test("returns 404 for invalid ids", async () => {
      const response = await request(app).get(makeRoute("/a-bad-id"));
      expect(response.statusCode).toBe(404);
    });

    test("returns 404 if a business with the id does not exist", async () => {
      const response = await request(app).get(makeRoute("/0"));
      expect(response.statusCode).toBe(404);
    });
  });
});
