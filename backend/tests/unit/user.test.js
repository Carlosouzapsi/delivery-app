const UserRepository = require("../../repositories/userRepository");
const { DB_URL } = require("../../config");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const 

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
    const userResult = await userRepository.SignUp({
      name: "carlos",
      email: "carlos@test.com",
      password: "123456",
    });

    console.log(userResult);
  });
});
