const cors = require("cors");
const express = require("express");
const connectDB = require("./db/db");
const conf = require("./config/config");

const app = express();

app.use(
  cors({
    origin: [conf.portfolio_url],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//ROUTES
//Health check route
app.use("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "LMS Backend API is running",
  });
});



//db-connection
connectDB();

// Global Error Handler
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong",
  });
});

module.exports = app;
