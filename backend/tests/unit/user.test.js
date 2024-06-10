const UserRepository = require("../../repositories/userRepository");
const { DB_URL } = require("../../config");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

let mongoServer;
const userRepository = new UserRepository();

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

describe("users tests", () => {
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
  it("Should add a new food", async () => {
    const foodResult = await foodRepository.AddFood({
      name: "Greek salad",
      image: "test",
      price: 12,
      description:
        "Food provides essential nutrients for overall health and well-being",
      category: "Salad",
    });
    expect(foodResult).toHaveProperty("_id");
    expect(foodResult.name).toBe("Greek salad");
  });
});
