const express = require("express");
const {
  getAllUsers,
  createUser,
  getUser,
  updateUse,
  deleteUser,
  updateMe,
  getItemInCart,
  getAllBoughts,
} = require("../Controllers/usersController");
const {
  signup,
  login,
  protect,
  restrictTo,
  isLoggedIn,
} = require("../Controllers/authController");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.get("/isLoggedIn", isLoggedIn);

router.use(protect);
router.patch("/updateMe", updateMe);

router.get("/myInCart", getItemInCart);
router.get("/myBought", getAllBoughts);

router.use(restrictTo("admin"));
router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getUser).patch(updateUse).delete(deleteUser);

module.exports = router;
