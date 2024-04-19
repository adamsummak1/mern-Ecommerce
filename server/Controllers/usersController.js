const Bought = require("../Model/boughtModel");
const Cart = require("../Model/cartModel");
const catchAsync = require("../util/catchAsync");
const User = require("./../Model/userModel");
const AppError = require("./../util/AppError");
const {
  getAllDoc,
  createDoc,
  getDoc,
  updateDoc,
  deleteDoc,
} = require("./handleFactory");

exports.getAllUsers = getAllDoc(User);
exports.createUser = createDoc(User);
exports.getUser = getDoc(User);
exports.updateUse = updateDoc(User);
exports.deleteUser = deleteDoc(User);

const filterObj = (obj, alowed) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (alowed.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.updateMe = catchAsync(async (req, res, next) => {
  if (!req.body.password || !req.body.passwordConfirm) {
    return next(new AppError("this not the url to update password", 400));
  }
  const filteredObj = filterObj(req.body, "name", "email");

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredObj);

  res.status(200).json({
    state: "success",
    data: {
      user: updatedUser,
    },
  });
});

exports.getItemInCart = catchAsync(async (req, res, next) => {
  const cart = await Cart.find({ user: req.user.id }).populate({
    path: "product",
  });

  res.status(200).json({
    state: "success",
    data: cart,
  });
});

exports.getAllBoughts = catchAsync(async (req, res, next) => {
  const boughts = await Bought.find({ user: req.user.id }).populate({
    path: "product",
  });

  res.status(200).json({
    state: "success",
    data: boughts,
  });
});
