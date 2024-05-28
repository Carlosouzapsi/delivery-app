const express = require("express");
const request = require("supertest");
const FoodService = require("../../services/foodService");
const { DB_URL } = require("../../config");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const path = require("path");
const expressApp = require("../../express-app");

const app = express();

let mongoServer;

const foodService = new FoodService();
/* Configurar arquivo jest para rodar testes de integração
separados dos unitários */
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(mongoUri, { dbName: DB_URL });

  await expressApp(app);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Food tests", () => {
  it("should add new food", async () => {
    const foodResult = {
      name: "Greek salad",
      description: "Food provides essential",
      price: 12,
      category: "Salad",
    };

    const response = await request(app)
      .post("/food/add")
      .field("name", foodResult.name)
      .field("description", foodResult.description)
      .field("price", foodResult.price)
      .field("category", foodResult.category)
      .attach(
        "image",
        path.resolve(__dirname, "../utils/images/test-image.png")
      )
      .expect(200);

    expect(response.body.data).toHaveProperty("_id");
  });
});
