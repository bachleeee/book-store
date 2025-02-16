const express = require("express");
const cors = require("cors");
const ApiError = require("./app/api-error");
const usersRouter = require("./app/routes/users.routes");
const productsRouter = require("./app/routes/products.routes");
const cookieParser = require("cookie-parser");

require('dotenv').config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to user book application",
  });
});

app.use("/api/users", usersRouter);
app.use("/api/products", productsRouter);

// handle 404 response
app.use((req, res, next) => {
  return next(new ApiError("Resource not found", 404));
});

// handle global error
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;