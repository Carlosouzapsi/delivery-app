const express = require("express");
const request = require("supertest");
const FoodService = require("../../services/foodService");
const FoodRepository = require("../../repositories/foodRepository");
const { DB_URL } = require("../../config");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const path = require("path");
const expressApp = require("../../express-app");

const app = express();

let mongoServer;

const foodService = new FoodService();
const foodRepository = new FoodRepository();
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
  it("Should add new food", async () => {
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
  it("Should list all foods", async () => {
    await foodRepository.AddFood({
      name: "Greek salad",
      image: "test",
      price: 12,
      description:
        "Food provides essential nutrients for overall health and well-being",
      category: "Salad",
    });
    await foodRepository.AddFood({
      name: "Chicken Salad",
      image: "test",
      price: 24,
      description:
        "Food provides essential nutrients for overall health and well-being",
      category: "Salad",
    });
    const response = await request(app).get("/food/list").expect(200);
    expect(response.body.data).toBeDefined();
  });

  it("Should remove a food by id", async () => {
    const foodResult = await foodRepository.AddFood({
      name: "Greek salad",
      image: "test",
      price: 12,
      description:
        "Food provides essential nutrients for overall health and well-being",
      category: "Salad",
    });

    const foodId = foodResult._id.toString();

    const response = await request(app)
      .post("/food/remove")
      .send({ id: foodId })
      .expect(200);
  });
});
