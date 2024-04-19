const express = require("express");
const {
  buyProduct,
  deleteBought,
  setId,
} = require("../Controllers/boughtController");
const { protect } = require("./../Controllers/authController");

const router = express.Router({ mergeParams: true });

router.use(protect);
router.post("/", setId, buyProduct);
router.delete("/:id", deleteBought);

module.exports = router;
