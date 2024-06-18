const express = require("express");
const connectDB = require("./config/db");
const expressApp = require("./express-app");

const startServer = async () => {
  const app = express();
  // config
  const port = 4001; // colocar no .env
  // db connection
  await connectDB();

  await expressApp(app);

  app
    .listen(port, () => {
      console.log(`Server Started on http://localhost:${port}`);
    })
    .on("error", (err) => {
      console.log(err);
      process.exit();
    });
};

startServer();
