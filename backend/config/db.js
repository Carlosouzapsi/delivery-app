const mongoose = require("mongoose");

const mongoURL =
  "mongodb+srv://carlosouzapsi:mA5wKWNuBBLzsZWh@cluster0.j4xy9ik.mongodb.net/delivery-app";

const connectDB = async (mongoURL) => {
  await mongoose
    .connect(
      "mongodb+srv://carlosouzapsi:mA5wKWNuBBLzsZWh@cluster0.j4xy9ik.mongodb.net/delivery-app"
    )
    .then(() => {
      console.log("DB Connected");
    });
};

module.exports = connectDB;
