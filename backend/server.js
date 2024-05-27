const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.js");
const foodRoute = require("./routes/foodRoute.js");

// config
const app = express();

const port = 4000;

// middleware
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("API Working");
});

// db connection
connectDB();

// api endpoints
app.use("/api/food", foodRoute);

app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});
