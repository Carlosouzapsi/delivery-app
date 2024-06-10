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
});
