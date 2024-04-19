const express = require("express");
const {
  addToCart,
  deleteFromCart,
  setId,
} = require("../Controllers/cartController");
const { protect } = require("./../Controllers/authController");

const router = express.Router({ mergeParams: true });

router.use(protect);
router.post("/", setId, addToCart);
router.delete("/:id", deleteFromCart);

module.exports = router;
