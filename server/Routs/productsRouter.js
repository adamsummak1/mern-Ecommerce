const express = require("express");
const {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  uploadProductsImages,
} = require("../Controllers/productsController");
const { restrictTo, protect } = require("./../Controllers/authController");

const cartRouter = require("./cartRouter");
const boughtRouter = require("./boughtRouter");

const router = express.Router();

router.use("/:productId/cart", cartRouter);
router.use("/:productId/bought", boughtRouter);

router.route("/").get(getAllProducts);

router.post("/", protect, uploadProductsImages, createProduct);

router
  .route("/:id")
  .get(getProduct)
  .patch(restrictTo("admin"), updateProduct)
  .delete(restrictTo("admin"), deleteProduct);

module.exports = router;
