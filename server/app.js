const express = require("express");
require("dotenv").config({ path: "./config.env" });
const AppError = require("./util/AppError");

const productsRouter = require("./Routs/productsRouter");
const usersRouter = require("./Routs/usersRouter");
const cartRouter = require("./Routs/cartRouter");
const boughtRouter = require("./Routs/boughtRouter");
const cors = require("cors");
const errorController = require("./Controllers/errorController");

const app = express();
app.use(express.json({ limit: "10kb" }));

app.use(cors());

app.use("/api/v1/products", productsRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/bought", boughtRouter);

app.all("*", (req, res, next) => {
  next(new AppError("no url found", 404));
});

app.use(errorController);

module.exports = app;
