const express = require("express");
const request = require("supertest");
const UserService = require("../../services/userService");
const UserRepository = require("../../repositories/userRepository");
const { DB_URL } = require("../../config");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const path = require("path");
const expressApp = require("../../express-app");

const app = express();
/* Configurar arquivo jest para rodar testes de integração
separados dos unitários */
let mongoServer;
const userRepository = new UserRepository();
const userService = new UserService();

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(mongoUri, {
    dbName: DB_URL,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});
// TODO
describe("users integration tests", () => {
  it("Should add a new user", async () => {
    const userData = {
      name: "carlos",
      email: "carlos@test.com",
      password: "123456",
    };
    const userResult = await userRepository.SignUp({
      name: userData.name,
      email: userData.email,
      password: userData.password,
    });

    expect(userResult).toHaveProperty("_id");
    expect(userResult.email).toBe(userData.email);
  });
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
});
