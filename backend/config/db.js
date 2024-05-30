const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect("mongodb://0.0.0.0:27019/delivery-app").then(() => {
    console.log("DB Connected");
  });
};

module.exports = connectDB;
