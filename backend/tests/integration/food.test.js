const express = require("express");
const request = require("supertest");
const FoodService = require("../../services/foodService");
const { DB_URL } = require("../../config");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

const app = new express();
const foodService = new FoodService();
/* Configurar arquivo jest para rodar testes de integração
separados dos unitários */
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(mongoUri, { dbName: DB_URL });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Food tests", () => {
  it("add new food", async () => {
    const foodResult = {
      name: "Greek salad",
      image: "test",
      price: 12,
      description:
        "Food provides essential nutrients for overall health and well-being",
      category: "Salad",
    };

    const response = await request(app).post("/food/add").send(foodResult);
    // .expect(201)
    console.log(response.status);
  });
});
